import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
  id?: string;
}

export default function Section({ children, className = '', background = 'white', id }: SectionProps) {
  const backgrounds = {
    white: 'bg-white text-gray-900',
    gray: 'bg-gray-900 text-white',
    dark: 'gradient-dark text-white',
  };

  return (
    <section id={id} className={`py-24 px-4 ${backgrounds[background]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
