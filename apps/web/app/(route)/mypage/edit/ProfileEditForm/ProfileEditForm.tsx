'use client';

import React from 'react';
import { Form, useForm } from 'react-hook-form';

import Button from '@repo/ui/Button';
import InputTitle from './(components)/InputTitle';
import NicknameInput from './(components)/NicknameInput';
import AvatarInput from './(components)/AvatarInput';
import PhoneInput from './(components)/PhoneInput';
import SnsInput from './(components)/SnsInput';
import CareerInput from './(components)/CareerInput';
import IntroInput from './(components)/IntroInput';
import UrlInput from './(components)/UrlInput';
import InterestsInput from './(components)/InterestsInput';
import OffersInput from './(components)/OffersInput';
import { UserType } from '@/types';

interface ProfileEditFormProps {
  profile: UserType;
}

function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const {
    register,
    setValue,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
  } = useForm<UserType>({
    defaultValues: {
      avatar: profile.avatar,
      career: profile.career,
      collectionId: profile.collectionId,
      collectionName: profile.collectionName,
      email: profile.email,
      created: profile.created,
      id: profile.id,
      interests: profile.interests,
      intro: profile.intro,
      nickname: profile.nickname,
      offers: profile.offers,
      phone: profile.phone,
      sns: profile.sns,
      updated: profile.updated,
      username: profile.username,
      verified: profile.verified,
      avatarUrl: profile.avatarUrl,
    },
  });

  const onFormdataSubmit = async ({
    formData,
    data,
  }: {
    formData: FormData;
    data: UserType;
  }) => {
    console.log('formData', formData);
    console.log('data', data);
  };

  const avatarRegister = register('avatar');

  return (
    <Form
      onSubmit={onFormdataSubmit}
      control={control}
      className='mx-auto mb-[120px] mt-[50px] w-[400px]'
    >
      <p className='text-H1M24 mb-10 text-center'>내 프로필 편집</p>

      <div className='mb-[52px] flex flex-col gap-11'>
        <div className='flex gap-[26px]'>
          <AvatarInput
            register={avatarRegister}
            watch={watch}
            avatarUrl={profile.avatarUrl}
          />

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <InputTitle label='이메일' />
              <p className='text-B2R14 text-neutral-90'>{profile.email}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <InputTitle label='이름' />
              <p className='text-B2R14 text-neutral-90'>{profile.username}</p>
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
  );
}

export default ProfileEditForm;
