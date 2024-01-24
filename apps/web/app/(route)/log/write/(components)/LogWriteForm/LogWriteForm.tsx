'use client';

import React from 'react';
import TitleInput from './(components)/TitleInput';
import TagInput from './(components)/TagInput';
import ImagesInput from './(components)/ImagesInput';
import ContentInput from './(components)/ContentInput';
import ActionButton from './(components)/ActionButton';
import PublicScopeSetting from './(components)/PublicScopeSetting';
import SeriesSetting from './(components)/SeriesSetting';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LogFormData {
  title: string;
  tag?: string[];
  thumbnail: File[];
  content: string;
  publicScope: any;
  series: string;
}

function LogWriteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogFormData>();
  const onSubmit: SubmitHandler<LogFormData> = data => console.log(data);

  const titleRegister = register('title', {
    required: '제목을 입력해주세요.',
  });

  const tagRegister = register('tag');

  const thumbnailRegister = register('thumbnail', {
    required: '썸네일을 입력해주세요.',
  });

  const contentRegister = register('content', {
    required: '내용을 입력해주세요.',
  });

  const publicScopeRegister = register('publicScope', {
    required: '공개 범위를 설정해주세요.',
  });

  const seriesRegister = register('series');

  return (
    <form>
      <TitleInput register={titleRegister} />
      <TagInput />
      <ImagesInput />
      <ContentInput />
      <ActionButton />
      <PublicScopeSetting />
      <SeriesSetting />
    </form>
  );
}

export default LogWriteForm;
