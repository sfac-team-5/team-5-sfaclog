'use client';

import React from 'react';
import TitleInput from './(components)/TitleInput';
import TagInput from './(components)/TagInput';
import ImagesInput from './(components)/ImagesInput';
import ActionButton from './(components)/ActionButton';
import PublicScopeSetting from './(components)/PublicScopeSetting';
import SeriesSetting from './(components)/SeriesSetting';
import { Form, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const ContentEditor = dynamic(() => import('./(components)/ContentInput'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export interface LogFormData {
  title: string;
  tag?: string[];
  thumbnail: FileList | null;
  content: string;
  publicScope: any;
  series: string;
}

function LogWriteForm() {
  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useForm<LogFormData>({
    defaultValues: {
      title: '',
      tag: [],
      thumbnail: null,
      content: '',
      publicScope: null,
      series: '',
    },
  });

  const onFormdataSubmit = async ({
    formData,
    data,
  }: {
    formData: FormData;
    data: LogFormData;
  }) => {
    formData.set('thumbnail', data.thumbnail && (data.thumbnail[0] as any));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/write`,
      {
        method: 'POST',
        body: formData,
      },
    );
  };

  const titleRegister = register('title', {
    // required: '제목을 입력해 주세요.',
  });

  const tagRegister = register('tag');

  const thumbnailRegister = register('thumbnail', {
    // required: '썸네일을 입력해 주세요.',
  });

  const contentRegister = register('content');

  const publicScopeRegister = register('publicScope', {
    // required: '공개 범위를 설정해 주세요.',
  });

  const seriesRegister = register('series');

  return (
    <Form onSubmit={onFormdataSubmit} control={control}>
      <TitleInput register={titleRegister} />
      <TagInput />
      <ImagesInput register={thumbnailRegister} />
      <ContentEditor setValue={setValue} />
      <PublicScopeSetting register={publicScopeRegister} />
      <SeriesSetting />
      <ActionButton />
    </Form>
  );
}

export default LogWriteForm;
