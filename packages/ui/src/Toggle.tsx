'use client';
import { useState } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleProps {
  leftText: string;
  rightText: string;
}

export function Toggle({ leftText, rightText }: ToggleProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`sho text-B1M16 relative inline-flex h-[50px] w-[224px] items-center rounded-[30px] bg-gray-200`}
    >
      <div className='relative z-10 flex w-full'>
        <div
          className={`w-1/2 ${!enabled ? 'text-text-point' : 'text-text-gray'}`}
        >
          {leftText}
        </div>
        <div
          className={`w-1/2 ${enabled ? 'text-text-point' : 'text-text-gray'}`}
        >
          {rightText}
        </div>
      </div>
      <div className='absolute top-0 w-full'>
        <span
          className={`${
            enabled ? 'translate-x-1/2' : '-translate-x-1/2'
          } shadow-custom inline-block h-[50px] w-1/2 rounded-full bg-white transition`}
        ></span>
      </div>
    </Switch>
  );
}
