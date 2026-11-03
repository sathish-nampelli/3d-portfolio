export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full-Stack' | '3D & Creative' | 'AI & Cloud' | 'Systems';
  image: string;
  tags: string[];
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  architectureNotes?: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    experience: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string; // "Full-Time", "Contract", "Open Source"
  description: string[];
  technologies: string[];
  metricHighlight?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  honors?: string;
  coursework: string[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  linkedin?: string;
}

export type ThemeMode = 'cyberpunk' | 'matrix' | 'synthwave' | 'minimal';
