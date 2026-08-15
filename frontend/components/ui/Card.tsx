import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = '',
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}
