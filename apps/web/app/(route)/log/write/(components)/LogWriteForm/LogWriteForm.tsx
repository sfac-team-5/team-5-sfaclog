'use client';

import React, { useEffect, useState } from 'react';
import TitleInput from './(components)/TitleInput';
import TagInput from './(components)/TagInput';
import ImagesInput from './(components)/ImagesInput';
import PublicScopeSetting from './(components)/PublicScopeSetting';
import SeriesSetting from './(components)/SeriesSetting';
import { Form, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import Button from '@repo/ui/Button';
import { useRouter } from 'next/navigation';
import { logCategories } from '@/constants';
import { useModalDataActions } from '@/hooks/stores/useModalStore';

const ContentEditor = dynamic(() => import('./(components)/ContentInput'), {
  loading: () => (
    <div className='h-[400px] w-[670px] rounded-md border border-stroke-30'></div>
  ),
  ssr: false,
});

export interface LogFormData {
  title: string;
  tag?: string[];
  thumbnail: FileList | null;
  content: string;
  publicScope: boolean;
  series: string;
}

function LogWriteForm() {
  const { onChange: changeModalData } = useModalDataActions();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
  } = useForm<LogFormData>({
    defaultValues: {
      title: '',
      tag: [],
      thumbnail: null,
      content: '',
      publicScope: true,
      series: '',
    },
  });
  const router = useRouter();
  const onFormdataSubmit = async ({
    formData,
    data,
  }: {
    formData: FormData;
    data: LogFormData;
  }) => {
    // 리펙토링 필요 T_T
    if (data.tag) {
      for (const tag of data.tag) {
        formData.append('tags', tag);
      }
    }

    formData.set('thumbnail', data.thumbnail && (data.thumbnail[0] as any));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/write`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const newLog = await response.json();
    if (newLog) {
      router.push(`/log/${newLog.id}`);
    }
  };

  const titleRegister = register('title', {
    required: '제목을 입력해 주세요.',
  });

  const tagRegister = register('tag');

  const thumbnailRegister = register('thumbnail');

  const contentRegister = register('content');

  const publicScopeRegister = register('publicScope');

  const seriesRegister = register('series');

  useEffect(() => {
    history.pushState(null, '', location.href);
    const browserPreventEvent = () => {
      history.pushState(null, '', location.href);
      changeModalData({
        title: '취소하기',
        description:
          '작성을 정말 취소하시겠습니까? 작성하신 로그가 사라집니다.',
        action: () => {
          router.push('/');
        },
      });
      router.push('/modal?type=back');
    };
    window.addEventListener('popstate', () => {
      browserPreventEvent();
    });
    return () => {
      window.removeEventListener('popstate', () => {
        browserPreventEvent();
      });
    };
  }, []);

  return (
    <>
      <Form
        onSubmit={onFormdataSubmit}
        control={control}
        className='mx-auto max-w-[670px]'
      >
        <div className='mb-10 flex gap-6'>
          <div className='flex w-full flex-col gap-[22px]'>
            <TitleInput
              label='제목'
              setValue={setValue}
              errors={errors}
              watch={watch}
            />
            <TagInput
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              errorMessage={errors.tag?.message}
            />
          </div>
          <ImagesInput register={thumbnailRegister} watch={watch} />
        </div>
        <ContentEditor setValue={setValue} getValues={getValues} />
        <div className='flex items-center justify-between pb-[60px] pt-10'>
          <PublicScopeSetting setValue={setValue} />
          <SeriesSetting setValue={setValue} selectList={logCategories} />
        </div>
        <div className='fixed bottom-0 left-0 flex w-full items-center justify-end gap-5 bg-neutral-5 px-[60px] py-3'>
          <p className='text-B3R12 text-neutral-40'>자동 저장 완료 00:00:00</p>
          <Button
            type='button'
            size='m'
            label='임시저장'
            disabled={true}
            className='!w-[146px]'
          />
          <Button
            type='submit'
            size='m'
            label='등록하기'
            onClick={() => onFormdataSubmit}
            className='!w-[146px]'
          />
        </div>
      </Form>
    </>
  );
}

export default LogWriteForm;
