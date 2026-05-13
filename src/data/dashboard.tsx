import { type ReactElement } from "react";
import {
  FiBriefcase,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTool,
  FiUser,
} from "react-icons/fi";
import { profile } from "./profile";

export interface QuickLink {
  to: string;
  title: string;
  description: string;
  cta: string;
  icon: ReactElement;
}

export interface SocialLink {
  href: string;
  label: string;
  value: string;
  icon: ReactElement;
  external?: boolean;
}

export const quickLinks: QuickLink[] = [
  {
    to: "/about",
    title: "Profilo",
    description: "Scopri chi sono, la mia formazione e le mie lingue.",
    cta: "Vedi profilo",
    icon: <FiUser size={20} />,
  },
  {
    to: "/skills",
    title: "Competenze",
    description: "Esplora le mie principali competenze e strumenti.",
    cta: "Vedi competenze",
    icon: <FiTool size={20} />,
  },
  {
    to: "/experience",
    title: "Esperienza",
    description: "Scopri il mio percorso professionale come sviluppatore.",
    cta: "Vedi esperienza",
    icon: <FiBriefcase size={20} />,
  },
  {
    to: "/contact",
    title: "Contatti",
    description: "Collegati con me tramite LinkedIn, GitHub o email.",
    cta: "Vedi contatti",
    icon: <FiMail size={20} />,
  },
];

export const socialLinks: SocialLink[] = [
  {
    href: profile.linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/luca-della-vecchia",
    icon: <FiLinkedin size={14} />,
    external: true,
  },
  {
    href: profile.github,
    label: "GitHub",
    value: "github.com/lucadellavecchia",
    icon: <FiGithub size={14} />,
    external: true,
  },
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    value: profile.email,
    icon: <FiMail size={14} />,
  },
];
