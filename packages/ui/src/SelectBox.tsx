'use client';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface SelectBoxProps {
  label?: string;
  width: 'long' | 'short';
  placeholder?: string;
  onChange: (data: any) => void;
  IconArrowUp: React.ReactNode;
  IconArrowDown: React.ReactNode;
  selectList: Array<any>;
}

export function Selectbox({
  IconArrowDown,
  IconArrowUp,
  label,
  onChange,
  width = 'long',
  placeholder,
  selectList,
}: SelectBoxProps) {
  const [selected, setSelected] = useState(placeholder ? null : selectList[0]);
  const [isOpen, setIsOpen] = useState(false);
  const widthClass = width === 'long' ? 'w-[400px]' : 'w-[122px]';
  const handleValChange = (data: any) => {
    setSelected(() => data);
    onChange(data);
  };
  return (
    <div className={`mt-10 ${widthClass}`}>
      <Listbox value={selected} onChange={handleValChange}>
        {label && <Listbox.Label>{label}</Listbox.Label>}
        <div className='relative mt-1'>
          <Listbox.Button
            onClick={() => setIsOpen(prev => !prev)}
            className={`ui-open:border-stroke-50 relative w-full cursor-pointer rounded-md border-[1px] bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm`}
          >
            <span className='block truncate'>
              {selected ? (
                selected.value
              ) : (
                <span className='text-neutral-40'>{placeholder}</span>
              )}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              {isOpen ? IconArrowUp : IconArrowDown}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='shadow-custom absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base focus:outline-none sm:text-sm'>
              {selectList.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative rounded-md cursor-default select-none ${width === 'long' ? 'py-2 pl-6 pr-4' : 'py-2 pl-4 pr-2'} ${
                      active
                        ? 'bg-primary-10 text-primary-100'
                        : 'text-neutral-40'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? 'text-primary-100 font-medium'
                            : 'font-normal'
                        }`}
                      >
                        {item.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
