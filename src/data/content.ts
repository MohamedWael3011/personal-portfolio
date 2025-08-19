import { IconName } from "tech-stack-icons";

export type TimelineItem = {
  period: string;
  title: string;
  description: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  imageUrl?: string;
};

export type SkillBubble = {
  label: string;
  color: string;
  content: IconName; // Icon
};

export const PROFILE = {
  name: "Mohamed Wael",
  role: "Full‑Stack Developer",
  summaryOne:
    "Focuses on shipping clean, accessible UIs with React. I build responsive features, leverage headless components (shadcn/ui), and care deeply about UX. While also building backend services with NestJS mantaining clean code and good practices for complex logic.",
  summaryTwo:
    "Previously, I freelanced building Discord bots and internal tools. I hold a dual BSc in Software Engineering (UEL, UK & Ain Shams University, EG), with honours and a CGPA of 3.76",
  resumePath: "/Mohamed_Wael_Resume.pdf",
};

export const EDUCATION_ITEMS: TimelineItem[] = [
  {
    period: "Oct ’21 – Jul ’25",
    title: "BSc Software Engineering (Dual Degree) with honours and CGPA 3.76",
    description:
      "University of East London (UK) & Faculty of Computer and Information Sciences, Ain Shams University (EG).",
  },
];

export const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    period: "Jan ’24 – Present",
    title: "Full‑Stack Developer, StorkTech (Cairo, EG)",
    description:
      "Built responsive front‑end with React/Vite; used shadcn/ui; focused on UX/accessibility; delivered invoicing system with translation logs and fallback mechanisms using NestJS and PrismaORM.",
  },
  {
    period: "Dec ’23 – Jan ’25",
    title: "Freelance Developer",
    description:
      "Commissioned Discord bots using discord.py/discord.js and internal automation tools.",
  },
  {
    period: "Sept ’23",
    title: "Full‑Stack Intern, Hypercell (Cairo, EG)",
    description:
      "Spring Boot + Angular training; shipped a simple blog web app; received recommendation letter.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "Task Manager RESTful API",
    description:
      "Built a RESTful API in NestJS with both TypeORM and Prisma layers to practice the framework and persistence patterns.",
    tags: ["NestJS", "TypeScript", "TypeORM", "Prisma"],
    githubUrl: "https://github.com/MohamedWael3011/task-manager-api",
  },
  {
    title: "Software Landing Page Website",
    description:
      "Modern landing page to practice frontend skills and animation using React + GSAP.",
    tags: ["React", "GSAP", "Vite"],
    githubUrl: "https://github.com/MohamedWael3011/software-company-demo",
  },
  {
    title: "Simple Blog API",
    description:
      "Java Spring Boot API implemented during the Hypercell internship.",
    tags: ["Java", "Spring Boot"],
    githubUrl: "https://github.com/MohamedWael3011/BlogProject",
  },
  {
    title: "GoomMemer – Discord Bot",
    description:
      "Commissioned Discord bot that generates memes/wallpapers using image processing techniques.",
    tags: ["Python", "Discord.py", "Pillow"],
    githubUrl: "https://github.com/MohamedWael3011/Goom",
  },
  {
    title: "Saraha – Anonymous Chat App",
    description:
      "Data structures course project; Windows GUI built with WinForms.",
    tags: ["C++", "WinForms"],
    githubUrl: "https://github.com/MohamedWael3011/SarahaWithGUI",
  },
  {
    title: "Game Farming Tracker",
    description:
      "Desktop tool for Pokémon encounter tracking using OpenCV with a Tkinter UI.",
    tags: ["Python", "OpenCV", "Tkinter"],
    githubUrl: "https://github.com/MohamedWael3011/PROFarmTracker",
  },
];

export const SKILL_BUBBLES: SkillBubble[] = [
  { label: "HTML", color: "#E34F26", content: "html5" },
  { label: "CSS", color: "#1572B6", content: "css3" },
  { label: "Tailwind", color: "#38BDF8", content: "tailwindcss" },
  { label: "React", color: "#61DAFB", content: "react" },
  { label: "Shadcn/ui", color: "#000000", content: "shadcnui" },
  { label: "TypeScript", color: "#3178C6", content: "typescript" },
  { label: "Node.js", color: "#68A063", content: "nodejs" },
  { label: "Three.js", color: "#000000", content: "threejs" },
  { label: "Vite", color: "#FF00FF", content: "vitejs" },
  { label: "Prisma", color: "#000000", content: "prisma" },
  { label: "NestJS", color: "#E0234E", content: "nestjs" },
  { label: "Redis", color: "#DC382D", content: "redis" },
  { label: "PostgreSQL", color: "#31648C", content: "postgresql" },
  { label: "AWS", color: "#232F3E", content: "aws" },
  { label: "Git", color: "#F05032", content: "git" },
  { label: "GitHub", color: "#181717", content: "github" },
  { label: "Jira", color: "#0052CC", content: "jira" },
  { label: "Figma", color: "#F24E1E", content: "figma" },
];
