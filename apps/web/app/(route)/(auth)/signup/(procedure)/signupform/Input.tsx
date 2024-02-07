import React, { InputHTMLAttributes, forwardRef, useState } from 'react';

import { IconViewCancel, IconViewGray } from '@repo/ui/Icon';

interface InputCustomProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password';
  errorMessage: string | undefined;
  successMessage?: string | boolean;
  hint?: string;
  // onValueChange?: (value: string) => void;
}

export const InputCustom = forwardRef<HTMLInputElement, InputCustomProps>(
  ({ className, errorMessage, successMessage, hint, type, ...props }, ref) => {
    const [isViewMode, setIsViewMode] = useState(false);
    const receivedClassName = className;
    return (
      <div className='relative flex w-full flex-col gap-[10px]'>
        <input
          type={isViewMode && type == 'password' ? 'text' : type}
          ref={ref}
          {...props}
          className={`text-B2R14 text-text-secondary placeholder:text-B2R14 placeholder:text-text-gray  h-[40px] w-full rounded-md border px-4 outline-none ${receivedClassName} ${errorMessage ? 'border-highlight-warning' : 'border-neutral-30'}`}
        />
        {isViewMode && type === 'password' && (
          <div
            className='absolute right-[10px] top-[10px] size-5 cursor-pointer'
            onClick={() => setIsViewMode(prev => !prev)}
          >
            <IconViewCancel />
          </div>
        )}
        {!isViewMode && type === 'password' && (
          <div
            className='absolute right-[10px] top-[10px] size-5 cursor-pointer'
            onClick={() => setIsViewMode(prev => !prev)}
          >
            <IconViewGray />
          </div>
        )}
        <div>
          {errorMessage && (
            <div className='text-B3R12 text-text-waring pl-1'>
              {errorMessage}
            </div>
          )}
          {successMessage && !errorMessage && (
            <div className='text-B3R12 text-text-success pl-1'>
              {successMessage}
            </div>
          )}
          {hint && !errorMessage && !successMessage && (
            <div className='text-B3R12 text-text-gray pl-1'>{hint}</div>
          )}
        </div>
      </div>
    );
  },
);

InputCustom.displayName = 'InputCustom';
