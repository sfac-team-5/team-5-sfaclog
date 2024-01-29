'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'filled' | 'outline';
}

export function ButtonRound({ children, onClick, type }: ButtonProps) {
  const hoverClasses =
    type === 'outline'
      ? 'text-neutral-90 h-8 hover:text-primary-90 hover:border-primary-90 border-[1px] border-transparent'
      : 'text-white bg-primary-70 hover:bg-primary-90';
  return (
    <button
      onClick={onClick}
      className={`w-max rounded-full px-4 py-[6px] text-sm font-medium transition-none ${hoverClasses} duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
}