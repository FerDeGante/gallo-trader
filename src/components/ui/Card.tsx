import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`glass backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10 hover-lift ${className}`}>
      {children}
    </div>
  );
}
