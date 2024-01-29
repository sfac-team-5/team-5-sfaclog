'use client';

import React from 'react';

import { Form, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import TitleInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/TitleInput';
import TagInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/TagInput';
import ImagesInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/ImagesInput';
import SeriesSetting from '@/(route)/log/write/(components)/LogWriteForm/(components)/SeriesSetting';
import PublicScopeSetting from '@/(route)/log/write/(components)/LogWriteForm/(components)/PublicScopeSetting';
import ActionButton from '@/(route)/log/write/(components)/LogWriteForm/(components)/ActionButton';

interface LogEditFormProps {
  log: any;
}

const ContentEditor = dynamic(
  () =>
    import(
      '@/(route)/log/write/(components)/LogWriteForm/(components)/ContentInput'
    ),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

interface LogFormData {
  title: string;
  tag?: string[];
  thumbnail: FileList | null;
  content: string;
  publicScope: any;
  series: string;
}

function LogEditForm({ log }: LogEditFormProps) {
  const {
    id,
    title,
    user,
    tag,
    thumbnail,
    content: prevContent,
    publicScope,
    series,
  } = log;
  console.log(thumbnail);
  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useForm<LogFormData>({
    defaultValues: {
      title,
      tag,
      thumbnail,
      content: prevContent,
      publicScope,
      series,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`,
      {
        method: 'PUT',
        body: formData,
      },
    );
  };

  // const onSubmit: SubmitHandler<LogFormData> = async data => {
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ ...data, user }),
  //   });
  // };

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
      <ContentEditor setValue={setValue} prevContent={prevContent} />
      <PublicScopeSetting register={publicScopeRegister} />
      <SeriesSetting />
      <ActionButton />
    </Form>
  );
}

export default LogEditForm;
