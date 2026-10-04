"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import Blob from "./Blob";

type Props = {
  progress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
};

export default function HeroScene({ progress, pointer, reduced }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      shadows={false}
    >
      <color attach="background" args={["#0b0b0b"]} />

      {/* Procedural studio HDRI (no network): softboxes + one orange strip for accent reflections */}
      <Environment resolution={512} frames={1}>
        <color attach="background" args={["#26262b"]} />
        <Lightformer form="rect" intensity={2.2} position={[0, 5, -3]} scale={[12, 3, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} position={[-6, 1, 2]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} position={[6, 1, 2]} scale={[2, 8, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" color="#ff5a1f" intensity={3.5} position={[3.5, -1, -4]} scale={5} />
        <Lightformer form="rect" color="#7aa7ff" intensity={1.6} position={[-4, -3, -3]} scale={[6, 1, 1]} />
        <Lightformer form="circle" intensity={2} position={[0, 0, 6]} scale={3} />
      </Environment>

      <Blob progress={progress} pointer={pointer} reduced={reduced} />

      <ContactShadows position={[0, -1.7, 0]} opacity={0.55} scale={9} blur={2.8} far={3.5} color="#000000" />

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur intensity={0.35} luminanceThreshold={1} luminanceSmoothing={0.2} />
        <Vignette eskil={false} offset={0.2} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
