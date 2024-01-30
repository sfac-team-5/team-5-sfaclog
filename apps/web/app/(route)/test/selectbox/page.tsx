'use client';
import React from 'react';
import { Selectbox } from '@repo/ui/SelectBox';
const selectList = [
  { value: 'Wade Cooper' },
  { value: 'Arlene Mccoy' },
  { value: 'Devon Webb' },
  { value: 'Tom Cook' },
  { value: 'Tanya Fox' },
  { value: 'Hellen Schmidt' },
];

export default function page() {
  return (
    <div className='ml-14'>
      <Selectbox
        onChange={data => console.log(data)}
        selectList={selectList}
        width='long'
        placeholder='무엇이 불편하셨나요?'
        label='라벨, 옵션들 추후 폰트 수정해야함'
      />
      <div>
        <Selectbox
          onChange={data => console.log(data)}
          selectList={selectList}
          width='short'
          label='라벨'
        />
      </div>
    </div>
  );
}
