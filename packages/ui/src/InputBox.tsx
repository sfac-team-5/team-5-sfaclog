'use client';
import React, { ForwardedRef, InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputBoxProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  type?: 'text' | 'password';
  value?: string;
  placeholder?: string | undefined;
  verifiedMessage?: string | null;
  errorMessage?: string | null;
  onValueChange?: (value: string) => void;
  formRef?: UseFormRegisterReturn;
}

export const InputBox = React.forwardRef(
  (
    {
      type = 'text',
      placeholder = undefined,
      verifiedMessage,
      errorMessage,
      onValueChange,
      formRef,
      ...otherProps
    }: InputBoxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isView, setIsView] = useState(false);

    const handleIsViewChange = () => {
      setIsView(pre => !pre);
    };

    const {
      ref: inputRef,
      onChange: formOnChange,
      ...formRest
    } = formRef || {};

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      if (onValueChange) {
        onValueChange(value);
      }
    };

    return (
      <div className='relative flex flex-col gap-2'>
        <input
          {...formRest}
          ref={ref}
          type={
            type === 'text'
              ? 'text'
              : type === 'password' && isView
                ? 'text'
                : 'password'
          }
          placeholder={placeholder}
          onChange={handleValueChange}
          className={`text-B2R14 text-text-secondary placeholder:text-B2R14 placeholder:text-text-gray h-[40px] w-full rounded-md border  px-4 outline-none ${errorMessage ? 'border-highlight-warning caret-highlight-warning focus:border-highlight-warning' : 'border-stroke-30 focus:border-stroke-50'}`}
          {...otherProps}
        />
        {verifiedMessage && (
          <span className='text-B3R12 text-text-success'>
            {verifiedMessage}
          </span>
        )}
        {errorMessage && (
          <span className='text-B3R12 text-text-waring'>{errorMessage}</span>
        )}
        {type === 'password' && isView && (
          <div
            className='absolute right-4 top-[12px] cursor-pointer'
            onClick={handleIsViewChange}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='15'
              viewBox='0 0 20 15'
              fill='none'
            >
              <path
                d='M18.3882 6.34517C18.7961 6.8565 19 7.11108 19 7.5C19 7.88892 18.7961 8.1435 18.3882 8.65483C16.8953 10.5225 13.6027 14 9.78028 14C5.95783 14 3.10469 10.5225 1.61188 8.65483C1.20398 8.1435 1.00003 7.88892 1.00003 7.5C1.00003 7.11108 1.20398 6.8565 1.61188 6.34517C3.10469 4.4775 5.95783 1 9.78028 1C13.6027 1 16.8953 4.4775 18.3882 6.34517Z'
                fill='#B3B3B3'
                stroke='#B3B3B3'
              />
              <path
                d='M10.0222 11.2918C12.0544 11.2918 13.7017 9.59424 13.7017 7.50016C13.7017 5.40608 12.0544 3.7085 10.0222 3.7085C7.99013 3.7085 6.34277 5.40608 6.34277 7.50016C6.34277 9.59424 7.99013 11.2918 10.0222 11.2918Z'
                fill='#B3B3B3'
                stroke='white'
                strokeWidth='2'
              />
            </svg>
          </div>
        )}
        {type === 'password' && !isView && (
          <div
            className='absolute right-[14px] top-[7px] cursor-pointer'
            onClick={handleIsViewChange}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 15C13.3807 15 14.5 13.8807 14.5 12.5C14.5 11.1193 13.3807 10 12 10C10.6193 10 9.5 11.1193 9.5 12.5C9.5 13.8807 10.6193 15 12 15Z'
                stroke='#B3B3B3'
                strokeWidth='2'
              />
              <path
                d='M19.4561 11.5228C19.8187 11.9555 20 12.1709 20 12.5C20 12.8291 19.8187 13.0445 19.4561 13.4772C18.1292 15.0575 15.2024 18 11.8047 18C8.40696 18 5.87084 15.0575 4.54389 13.4772C4.18132 13.0445 4.00003 12.8291 4.00003 12.5C4.00003 12.1709 4.18132 11.9555 4.54389 11.5228C5.87084 9.9425 8.40696 7 11.8047 7C15.2024 7 18.1292 9.9425 19.4561 11.5228Z'
                stroke='#B3B3B3'
                strokeWidth='2'
              />
              <path
                d='M4 6L20 19'
                stroke='#B3B3B3'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
        )}
      </div>
    );
  },
);

InputBox.displayName = 'InputBox';
