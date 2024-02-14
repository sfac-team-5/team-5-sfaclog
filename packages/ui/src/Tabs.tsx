'use client';
import React, { Fragment, Children } from 'react';
import { Tab } from '@headlessui/react';
interface NavTabsProps {
  children: React.ReactNode;
  defaultSelectedTabIndex?: number;
  onChange?: (index: number) => void;
}
/**
 *
 * @description Tabs 컴포넌트안에 있는 자식 요소들은 탭이 된다
 * @description CSS guide / tab 선택O => ui-selected:bg-brand-50 / tab 선택X => ui-not-selected:bg-neutral-30
 * @param onChange (index:number) => void
 */
export function Tabs({
  children,
  defaultSelectedTabIndex,
  onChange,
}: NavTabsProps) {
  return (
    <Tab.Group defaultIndex={defaultSelectedTabIndex} onChange={onChange}>
      <Tab.List className={'relative flex items-center justify-center'}>
        {Children.map(children, (child, idx) => (
          <Tab key={idx} as={Fragment}>
            {child}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
