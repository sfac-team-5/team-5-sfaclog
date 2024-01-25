'use client';
import React, { Fragment, Children } from 'react';
import { Tab } from '@headlessui/react';
interface NavTabsProps {
  children: React.ReactNode;
  defaultSelectedTabIndex?: number;
}
export function NavTabs({ children, defaultSelectedTabIndex }: NavTabsProps) {
  return (
    <Tab.Group defaultIndex={defaultSelectedTabIndex}>
      <Tab.List>
        {Children.map(children, (child, idx) => (
          <Tab key={idx} as={Fragment}>
            {child}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
