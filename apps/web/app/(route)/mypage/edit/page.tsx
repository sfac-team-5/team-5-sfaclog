'use client';

import React from 'react';
import Image from 'next/image';
import { Form, useForm } from 'react-hook-form';

import Button from '@repo/ui/Button';
import InputTitle from './(components)/InputTitle';
import NicknameInput from './(components)/NicknameInput';
import ImageInput from './(components)/ImageInput';
import PhoneInput from './(components)/PhoneInput';
import SnsInput from './(components)/SnsInput';
import CareerInput from './(components)/CareerInput';
import IntroInput from './(components)/IntroInput';
import UrlInput from './(components)/UrlInput';
import InterestsInput from './(components)/InterestsInput';
import OffersInput from './(components)/OffersInput';

export interface ProfileFormData {
  nickname: string;
  image: FileList | null;
  phone: string;
}

function page() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
  } = useForm<ProfileFormData>({
    // defaultValues: {
    //   title: '',
    //   tag: [],
    //   thumbnail: null,
    //   content: '',
    //   publicScope: true,
    //   series: '',
    // },
  });

  const onFormdataSubmit = async ({
    formData,
    data,
  }: {
    formData: FormData;
    data: ProfileFormData;
  }) => {
    console.log('formData', formData);
    console.log('data', data);
  };

  const imageRegister = register('image');

  return (
    <div>
      <Form
        onSubmit={onFormdataSubmit}
        control={control}
        className='mx-auto mb-[120px] mt-[50px] w-[400px]'
      >
        <p className='text-H1M24 mb-10 text-center'>내 프로필 편집</p>

        <div className='mb-[52px] flex flex-col gap-11'>
          <div className='flex gap-[26px]'>
            <ImageInput register={imageRegister} watch={watch} />

            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <InputTitle label='이메일' />
                <p className='text-B2R14 text-neutral-90'>
                  designbasekorea@gmail.com
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <InputTitle label='이름' />
                <p className='text-B2R14 text-neutral-90'>사용자</p>
              </div>
              <NicknameInput setValue={setValue} errors={errors} />
            </div>
          </div>
          <PhoneInput setValue={setValue} errors={errors} />
          <SnsInput setValue={setValue} errors={errors} />
          <CareerInput setValue={setValue} errors={errors} />
          <IntroInput setValue={setValue} errors={errors} />
          <UrlInput setValue={setValue} errors={errors} />
          <InterestsInput setValue={setValue} errors={errors} />
          <OffersInput setValue={setValue} errors={errors} />
        </div>

        <Button
          type='submit'
          size='l'
          label='저장하기'
          onClick={() => onFormdataSubmit}
        />
      </Form>
    </div>
  );
}

export default page;
