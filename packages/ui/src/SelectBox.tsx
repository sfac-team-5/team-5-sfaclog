'use client';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  IconTaillessArrowUpBlack,
  IconTaillessArrowDownBlack,
} from '../public/svgs';

interface SelectBoxProps {
  label?: string;
  width: 'long' | 'short';
  placeholder?: string;
  onChange: (data: any) => void;
  selectList: Array<any>;
  selectedOption?: any;
}

export function Selectbox({
  onChange,
  width = 'long',
  placeholder,
  selectList,
  selectedOption,
}: SelectBoxProps) {
  const [selected, setSelected] = useState(placeholder ? null : selectList[0]);

  useEffect(() => {
    if (selectedOption) {
      setSelected(selectedOption);
    }
  }, [selectedOption]);

  const widthClass = width === 'long' ? 'w-[400px]' : 'w-[122px]';
  const handleValChange = (data: any) => {
    setSelected(() => data);
    onChange(data);
  };

  return (
    <div className={`${widthClass}`}>
      <Listbox value={selected} onChange={handleValChange}>
        <div className='relative'>
          <Listbox.Button
            className={`ui-open:border-stroke-50 relative w-full cursor-pointer rounded-md border-[1px] bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm`}
          >
            <span className='block truncate'>
              {selected ? (
                <span className='text-text-primary'>{selected.value}</span>
              ) : (
                <span className='text-neutral-40'>{placeholder}</span>
              )}
            </span>
            <span className='ui-not-open:hidden pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <IconTaillessArrowUpBlack />
            </span>
            <span className='ui-open:hidden pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <IconTaillessArrowDownBlack />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='shadow-custom scrollbar-hide absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base focus:outline-none sm:text-sm'>
              {selectList.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative text-B1R16  rounded-md cursor-pointer select-none ${width === 'long' ? 'py-2 pl-6 pr-4' : 'py-2 pl-3 pr-2'} ${
                      active ? 'bg-brand-10 text-brand-100' : 'text-neutral-40'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected && 'text-brand-100'
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
