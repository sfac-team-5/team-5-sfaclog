'use client';
import { IconCheckBoxBlue, IconCheckBoxGray } from '@repo/ui/Icon';

interface RadioButtonsProps {
  value: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange: ({
    name,
    value,
    checked,
  }: {
    name: string;
    value: string;
    checked: boolean;
  }) => void;
}

export function Check({
  value,
  name,
  label,
  checked = false,
  onChange,
}: RadioButtonsProps) {
  return (
    <div className='inline-block p-[10px]'>
      <label className='group flex gap-[10px]'>
        <input
          type='checkbox'
          name={name}
          className='peer hidden'
          value={value}
          defaultChecked={checked}
          onChange={e =>
            onChange({ name, value: e.target.value, checked: e.target.checked })
          }
        />
        <span className='hidden size-5 peer-checked:block'>
          <IconCheckBoxBlue />
        </span>
        <span className='block size-5 peer-checked:hidden'>
          <IconCheckBoxGray />
        </span>
        <div className='text-B1R16 w-max'>{label}</div>
      </label>
    </div>
  );
}
