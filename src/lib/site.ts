// All copy lives here — edit this file to make the page yours.
export const site = {
  name: "Your Name",
  role: "Marketing Strategist & Content Creator",
  email: "hello@yourname.com",
  location: "Remote · Worldwide",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
  tiktok: "https://tiktok.com/",
};

export const nav = [
  { id: "work", n: "01", label: "Work" },
  { id: "about", n: "02", label: "About" },
  { id: "archive", n: "03", label: "Playground" },
  { id: "contact", n: "04", label: "Contact" },
];

export const skills = [
  "Social Strategy",
  "Content Creation",
  "Paid Social",
  "Short-form Video",
  "Community Management",
  "Influencer Partnerships",
  "Brand Voice",
  "Analytics & Reporting",
  "Copywriting",
  "Campaign Planning",
];

export const categories = ["All", "Strategy", "Content", "Paid", "Community"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  n: string;
  title: string;
  category: Exclude<Category, "All">;
  metric: string;
  art: 0 | 1 | 2 | 3 | 4 | 5;
};

export const projects: Project[] = [
  { n: "01", title: "Soundwave Launch", category: "Content", metric: "4.2M organic views", art: 0 },
  { n: "02", title: "The Sphere Rebrand", category: "Strategy", metric: "+212% follower growth", art: 1 },
  { n: "03", title: "Liquid Summer", category: "Paid", metric: "3.8x ROAS", art: 2 },
  { n: "04", title: "The Face Campaign", category: "Community", metric: "92K UGC posts", art: 3 },
  { n: "05", title: "Midnight Drop", category: "Content", metric: "1.1M reach in 48h", art: 4 },
  { n: "06", title: "The Zoo Series", category: "Strategy", metric: "9.4% engagement", art: 5 },
];

export const results = [
  { tag: "Impact", sector: "E-commerce & D2C brands", metric: "+120%", note: "Increased conversion through content-led social funnels", tone: "from-[#1d3557] to-[#7aa6d6]" },
  { tag: "Retention", sector: "Food & beverage", metric: "85%", note: "Clients retained long term with monthly strategy sprints", tone: "from-[#2f4a1f] to-[#9bbf6a]" },
  { tag: "Growth", sector: "Corporate & enterprise teams", metric: "3x", note: "Average engagement growth within the first quarter", tone: "from-[#7a2a0c] to-[#ff5a1f]" },
  { tag: "Reach", sector: "Creators & personal brands", metric: "10M+", note: "Organic impressions generated across short-form video", tone: "from-[#2a1f4a] to-[#8f7ad6]" },
];

export const archive = [
  { year: "2025", items: ["Brand Reel", "Creator Collab", "Launch Week", "Community Q&A"] },
  { year: "2024", items: ["Paid Test Lab", "Podcast Clips", "Product Drop"] },
  { year: "2023", items: ["Content Calendar", "UGC Kit", "Holiday Push", "Rebrand"] },
  { year: "2022", items: ["First Agency Role", "Freelance Start"] },
];
