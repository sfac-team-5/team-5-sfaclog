'use client';

import React from 'react';
import { Toggle } from '@repo/ui/Toggle';

export default function page() {
  return (
    <div className='h-40 bg-slate-400'>
      <Toggle leftText='팔로잉 100' rightText='팔로워 100' />
    </div>
  );
}
