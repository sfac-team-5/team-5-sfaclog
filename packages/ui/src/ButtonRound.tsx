'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'filled' | 'outline';
  disabled?: boolean;
}

export function ButtonRound({
  children,
  onClick,
  type,
  disabled = false,
}: ButtonProps) {
  const hoverClasses =
    type === 'outline'
      ? 'text-neutral-90 h-8 hover:text-brand-90 hover:border-brand-90 border-[1px] border-transparent'
      : 'text-white bg-brand-70 hover:bg-brand-90 active:bg-brand-90';
  return (
    <button
      onClick={onClick}
      className={`text-B2M14 w-full rounded-full px-4 py-[6px] transition-none ${hoverClasses} duration-200 ease-in-out`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
