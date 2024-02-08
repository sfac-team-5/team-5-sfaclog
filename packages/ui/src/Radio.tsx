'use client';
import { IconRadioBoxBlue, IconRadioBoxGray } from '@repo/ui/Icon';
interface RadioButtonsProps {
  value: string;
  label: string;
  name: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

export function Radio({ value, name, label, onChange }: RadioButtonsProps) {
  return (
    <div className='inline-block p-[10px]'>
      <label className='group flex gap-[10px]'>
        <input
          type='radio'
          name={name}
          className='peer hidden'
          value={value}
          onChange={e => onChange({ name, value: e.target.value })}
        />
        <span className='hidden size-5 peer-checked:block '>
          <IconRadioBoxBlue />
        </span>
        <span className='block size-5 peer-checked:hidden'>
          <IconRadioBoxGray />
        </span>
        <div className='text-B1R16 w-max'>{label}</div>
      </label>
    </div>
  );
}
