import { Github, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
  color: string;
  isExternal: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/anayap04',
    icon: Github,
    label: 'GitHub',
    color: 'var(--purple)',
    isExternal: true,
  },
  {
    href: 'https://www.linkedin.com/in/pandrea04/',
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'var(--periwinkle)',
    isExternal: true,
  },
  {
    href: 'mailto:anayap04@outlook.com',
    icon: Mail,
    label: 'Email',
    color: 'var(--hot-pink)',
    isExternal: false,
  },
];
