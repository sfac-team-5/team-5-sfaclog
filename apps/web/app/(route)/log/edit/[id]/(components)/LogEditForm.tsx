'use client';

import React from 'react';

import { Form, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import TitleInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/TitleInput';
import TagInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/TagInput';
import ImagesInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/ImagesInput';
import SeriesSetting from '@/(route)/log/write/(components)/LogWriteForm/(components)/SeriesSetting';
import PublicScopeSetting from '@/(route)/log/write/(components)/LogWriteForm/(components)/PublicScopeSetting';
import Button from '@repo/ui/Button';
import { useRouter } from 'next/navigation';
import { editLogApi } from '@/utils/editLogApi';
import { logCategories } from '@/constants';

// import ActionButton from '@/(route)/log/write/(components)/LogWriteForm/(components)/ActionButton';

interface LogEditFormProps {
  log: any;
}

const ContentEditor = dynamic(
  () =>
    import(
      '@/(route)/log/write/(components)/LogWriteForm/(components)/ContentInput'
    ),
  {
    loading: () => (
      <div className='h-[400px] w-[670px] rounded-md border border-stroke-30'></div>
    ),
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
    tags,
    thumbnail,
    content: prevContent,
    isVisibility,
    series,
  } = log;

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
      title,
      tag: tags,
      thumbnail,
      content: prevContent,
      publicScope: isVisibility,
      series,
    },
  });
  const router = useRouter();
  // const onFormdataSubmit = async ({
  //   formData,
  //   data,
  // }: {
  //   formData: FormData;
  //   data: LogFormData;
  // }) => {
  //   formData.set('thumbnail', data.thumbnail && (data.thumbnail[0] as any));
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`,
  //     {
  //       method: 'PUT',
  //       body: formData,
  //     },
  //   );
  // };

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

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`,
    //   {
    //     method: 'PUT',
    //     body: formData,
    //   },
    // );
    // const updatgeLog = await response.json();
    // if (updatgeLog) {
    //   router.push(`/log/${updatgeLog.id}`);
    //   router.refresh();
    // }

    editLogApi({ formData, id }).then(() => {
      router.push(`/log/${id}`);
    });
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
          {/* <TitleInput register={titleRegister} /> */}
          {/* <TagInput /> */}
          <TagInput
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            errorMessage={errors.tag?.message}
            tag={tags}
          />
        </div>
        {/* <ImagesInput register={thumbnailRegister} /> */}
        <ImagesInput
          register={thumbnailRegister}
          watch={watch}
          thumbnail={thumbnail}
          logId={id}
        />
      </div>
      {/* <ContentEditor setValue={setValue} prevContent={prevContent} /> */}
      <ContentEditor setValue={setValue} getValues={getValues} />
      <div className='flex items-center justify-between pb-[60px] pt-10'>
        {/* <PublicScopeSetting register={publicScopeRegister} /> */}
        <PublicScopeSetting setValue={setValue} publicScope={isVisibility} />
        {/* <SeriesSetting /> */}
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
          label='수정하기'
          onClick={() => onFormdataSubmit}
          className='!w-[146px]'
        />
      </div>
    </Form>
  );
}

export default LogEditForm;
