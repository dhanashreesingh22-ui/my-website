"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const DISPLACE = /* glsl */ `
uniform float uTime;
uniform float uMorph;      // 0..3 : sphere -> ridged -> cube -> sphere
uniform float uAmp;
uniform vec3  uPointer;    // object-space pointer direction (unit-ish, 0 = none)
uniform float uPointerAmt;

float smoothW(float m, float c){ float d = abs(m - c); d = min(d, 3. - d); return 1. - smoothstep(0., 1., d); }

vec3 shapeAt(vec3 n){
  float w0 = smoothW(uMorph, 0.);
  float w1 = smoothW(uMorph, 1.);
  float w2 = smoothW(uMorph, 2.);
  float ws = w0 + w1 + w2; w0 /= ws; w1 /= ws; w2 /= ws;

  // twisted ridged form — twist/ridge strength is scaled by its own weight so
  // neighbouring shapes never cross each other mid-morph (no pinching)
  float tw = n.y * 2.2 * w1 + uTime * .12 * w1;
  float c = cos(tw), s = sin(tw);
  vec3 nt = vec3(c*n.x - s*n.z, n.y, s*n.x + c*n.z);
  float ang = atan(nt.z, nt.x);
  float ridge = sin(ang * 6. + n.y * 5.) * .14 * w1 * (1. - n.y*n.y*.55);
  vec3 s1 = nt * (1. + ridge) * mix(vec3(1.), vec3(.88, 1.22, .88), w1);

  // soft cube (superellipsoid)
  vec3 a = pow(abs(n), vec3(7.));
  float k = pow(a.x + a.y + a.z, 1./7.);
  vec3 s2 = n / k * .9;

  vec3 p = n * w0 + s1 * w1 + s2 * w2;

  // organic noise, stronger near the pointer
  float near = 0.;
  if (uPointerAmt > 0.001) {
    float d = distance(n, normalize(uPointer));
    near = exp(-d*d*2.2) * uPointerAmt;
  }
  float nz = snoise(n * 1.35 + vec3(0., uTime * .22, uTime * .17));
  float nz2 = snoise(n * 2.6 - uTime * .3) * .12;
  float amp = uAmp * (.6*w0 + 1.*w1 + .3*w2) + near * .14;
  p += n * (nz + nz2) * amp;
  // gentle pull toward pointer
  p *= 1. + near * .16;
  return p;
}
`;

const NORMALS = /* glsl */ `
vec3 nIn = normalize(position);
vec3 tA = normalize(cross(nIn, abs(nIn.y) > .98 ? vec3(1.,0.,0.) : vec3(0.,1.,0.)));
vec3 tB = cross(nIn, tA);
float eps = .012;
vec3 p0 = shapeAt(nIn);
vec3 p1 = shapeAt(normalize(nIn + tA * eps));
vec3 p2 = shapeAt(normalize(nIn + tB * eps));
vec3 nrm = normalize(cross(p1 - p0, p2 - p0));
if (dot(nrm, nIn) < 0.) nrm = -nrm;
vec3 objectNormal = nrm;
#ifdef USE_TANGENT
  vec3 objectTangent = vec3( tangent.xyz );
#endif
`;

type Props = {
  progress: React.MutableRefObject<number>; // 0..1 across hero scroll
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced?: boolean;
};

export default function Blob({ progress, pointer, reduced }: Props) {
  const mesh = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uAmp: { value: 0.065 },
      uPointer: { value: new THREE.Vector3() },
      uPointerAmt: { value: 0 },
    }),
    [],
  );

  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 1,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 1,
      iridescenceIOR: 1.7,
      iridescenceThicknessRange: [120, 720],
      envMapIntensity: 1.2,
    });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${NOISE}\n${DISPLACE}`)
        .replace("#include <beginnormal_vertex>", NORMALS)
        .replace("#include <begin_vertex>", "vec3 transformed = shapeAt(normalize(position));");
    };
    m.customProgramCacheKey = () => "morph-blob-v1";
    return m;
  }, [uniforms]);

  const smooth = useRef({ morph: 0, px: 0, py: 0, amt: 0 });
  const dir = useMemo(() => new THREE.Vector3(), []);
  const inv = useMemo(() => new THREE.Matrix4(), []);

  useFrame((state, dt) => {
    const s = smooth.current;
    const t = reduced ? 0 : state.clock.elapsedTime;
    uniforms.uTime.value = t;

    // scroll -> morph target: 0 → 3 across the hero (sphere → ridged → cube → sphere)
    const target = THREE.MathUtils.clamp(progress.current, 0, 1) * 3;
    s.morph = THREE.MathUtils.damp(s.morph, target, 3.2, dt);
    uniforms.uMorph.value = s.morph;

    // pointer (NDC) smoothing
    s.px = THREE.MathUtils.damp(s.px, pointer.current.x, 4, dt);
    s.py = THREE.MathUtils.damp(s.py, pointer.current.y, 4, dt);

    const m = mesh.current;
    // lean + drift toward the cursor
    m.position.x = THREE.MathUtils.damp(m.position.x, s.px * 0.45, 3, dt);
    m.position.y = THREE.MathUtils.damp(m.position.y, 0.1 + s.py * 0.3, 3, dt);
    m.rotation.y += dt * (reduced ? 0 : 0.18);
    m.rotation.x = THREE.MathUtils.damp(m.rotation.x, -s.py * 0.35, 3, dt);

    // pointer direction in object space: ray from the camera towards the cursor, projected on the blob
    dir.set(s.px * 1.6 - m.position.x, s.py * 1.0 - (m.position.y - 0.1), 1.2);
    inv.copy(m.matrixWorld).invert();
    dir.transformDirection(inv);
    uniforms.uPointer.value.copy(dir);
    const hover = Math.min(1, Math.hypot(s.px, s.py) * 1.4 + 0.15);
    s.amt = THREE.MathUtils.damp(s.amt, hover, 3, dt);
    uniforms.uPointerAmt.value = s.amt;

    // breathe a little
    const sc = 1 + Math.sin(t * 0.6) * 0.015;
    m.scale.setScalar(sc * 1.05);
  });

  return (
    <mesh ref={mesh} material={material} castShadow frustumCulled={false}>
      <icosahedronGeometry args={[1, 56]} />
    </mesh>
  );
}
