'use client';
import React, { Fragment, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PopularSearchTerms } from './Search/PopularSearchTerms';
import { SearchBar } from './Search/SearchBar';
import { IconCancelBlack } from '@repo/ui/Icon';
import { RecentSearches } from './Search/RecentSearches';
import { Transition } from '@headlessui/react';
interface ModalSearchProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// { isOpen, setIsOpen }: ModalSearchProps
export function ModalSearch({ setIsModalOpen }: ModalSearchProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <>
      <Transition show={isOpen} appear as={Fragment}>
        <Dialog onClose={handleClose}>
          <Transition.Child
            enter='transition-transform duration-300 ease-in-out'
            enterFrom='transform opacity-30 translate-y-[-200px]'
            enterTo='transform opacity-100 translate-y-0'
            leave='transition-transform duration-300 ease-in-out'
            leaveFrom='transform opacity-100 translate-y-0'
            leaveTo='transform opacity-0 translate-y-[-200px]'
            className='absolute top-[46px] z-40 h-[198px] w-full bg-white opacity-95'
          >
            <Dialog.Panel>
              <div>
                <div className='mt-6 flex justify-center gap-[85px]'>
                  <PopularSearchTerms />
                  <div className='flex flex-col'>
                    <SearchBar onClose={handleClose} />
                    <div className='mt-4'>
                      <RecentSearches onClose={handleClose} />
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleClose}
                  className='absolute right-10 top-0 mt-6 cursor-pointer'
                >
                  <IconCancelBlack className='stroke-neutral-40 size-6' />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              className='fixed inset-0 z-30 cursor-pointer bg-black/30'
              aria-hidden='true'
            />
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
