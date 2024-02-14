'use client';
import React, { useState } from 'react';
import { Radio } from '@repo/ui/Radio';
import { PrivacyPolicyText } from './PrivacyPolicyText';
import { ServicePolicyText } from './ServicePolicyText';
interface RadioProps {
  name: string;
  value: string;
}
export function MypagePolicy() {
  const [data, setData] = useState({
    privacy: false,
    service: false,
  });
  const handleRadioChange = (data: RadioProps) => {
    if (data.value === '동의') {
      setData(prev => ({
        ...prev,
        [data.name]: true,
      }));
    } else if (data.value === '거부') {
      setData(prev => ({
        ...prev,
        [data.name]: false,
      }));
    }
  };

  return (
    <section className='w-fit'>
      <div className='text-H1M24 mb-8'>이용약관&개인정보처리방침</div>
      <div className='mb-16 w-[632px]'>
        <div className='text-H3R18 mb-3'>개인정보처리방침</div>
        <PrivacyPolicyText />
        <Radio
          checked
          value='동의'
          name='privacy'
          label='동의'
          onChange={handleRadioChange}
        />
        <Radio
          value='거부'
          name='privacy'
          label='거부'
          onChange={handleRadioChange}
        />
      </div>
      <div className='mb-16 w-[632px]'>
        <div className='text-H3R18 mb-3'>서비스 이용약관</div>
        <ServicePolicyText />
        <Radio
          checked
          value='동의'
          name='service'
          label='동의'
          onChange={handleRadioChange}
        />
        <Radio
          value='거부'
          name='service'
          label='거부'
          onChange={handleRadioChange}
        />
      </div>
    </section>
  );
}
