'use client';

import React, { useState } from 'react';
import TitleInput from './(components)/TitleInput';
import TagInput from './(components)/TagInput';
import ImagesInput from './(components)/ImagesInput';
import ActionButton from './(components)/ActionButton';
import PublicScopeSetting from './(components)/PublicScopeSetting';
import SeriesSetting from './(components)/SeriesSetting';
import { SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import PocketBase from 'pocketbase';

const ContentEditor = dynamic(() => import('./(components)/ContentInput'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface LogFormData {
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
    handleSubmit,
    formState: { errors },
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

  const onSubmit: SubmitHandler<LogFormData> = async data => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/write`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const newLog = await response.json();
    if (newLog && data.thumbnail) {
      const pb = new PocketBase('http://3.35.176.72:8090');
      await pb
        .collection('logs')
        .update(newLog.id, { thumbnail: data.thumbnail[0] });
    }
  };
  const [content, setContent] = useState('');

  const titleRegister = register('title', {
    // required: '제목을 입력해 주세요.',
  });

  const tagRegister = register('tag');

  const thumbnailRegister = register('thumbnail', {
    // required: '썸네일을 입력해 주세요.',
  });

  // const contentRegister = register('content', {
  //   required: '내용을 입력해 주세요.',
  // });

  const publicScopeRegister = register('publicScope', {
    // required: '공개 범위를 설정해 주세요.',
  });

  const seriesRegister = register('series');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleInput register={titleRegister} />
      <TagInput />
      <ImagesInput register={thumbnailRegister} />
      <ContentEditor content={content} setContent={setContent} />
      <PublicScopeSetting register={publicScopeRegister} />
      <SeriesSetting />
      <ActionButton />
    </form>
  );
}

export default LogWriteForm;
