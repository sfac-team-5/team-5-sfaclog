'use client';
import dynamic from 'next/dynamic';
import { Form, useForm } from 'react-hook-form';
import Button from '@repo/ui/Button';
import TitleInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/TitleInput';
import TagInput from '@/(route)/log/write/(components)/LogWriteForm/(components)/TagInput';
import PublicScopeSetting from '@/(route)/log/write/(components)/LogWriteForm/(components)/PublicScopeSetting';
import SeriesSetting from '@/(route)/log/write/(components)/LogWriteForm/(components)/SeriesSetting';

const selectList = [
  { value: '자유주제' },
  { value: '고민있어요' },
  { value: '질문&답변' },
];

const ContentEditor = dynamic(
  () =>
    import(
      '@/(route)/log/write/(components)/LogWriteForm/(components)/ContentInput'
    ),
  {
    loading: () => (
      <div className='border-stroke-30 h-[400px] w-[670px] rounded-md border'></div>
    ),
    ssr: false,
  },
);

export interface CommunityFormData {
  title: string;
  tag?: string[];
  content: string;
  publicScope: boolean;
  series: string;
}

function CommunityWriteForm() {
  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<CommunityFormData>({
    defaultValues: {
      title: '',
      tag: [],
      content: '',
      publicScope: true,
      series: '',
    },
  });

  const onFormdataSubmit = async ({
    formData,
    data,
  }: {
    formData: FormData;
    data: CommunityFormData;
  }) => {
    console.log(data);
    // 리펙토링 필요 T_T
    if (data.tag) {
      for (const tag of data.tag) {
        formData.append('tags', tag);
      }
    }

    switch (data.series) {
      case '자유주제':
        formData.set('series', 'free');
        break;
      case '고민있어요':
        formData.set('series', 'trouble');
        break;
      case '질문&답변':
        formData.set('series', 'qna');
        break;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/community`,
      {
        method: 'POST',
        body: formData,
      },
    );
  };

  const titleRegister = register('title', {
    required: '제목을 입력해 주세요.',
  });

  const tagRegister = register('tag');

  const contentRegister = register('content');

  const publicScopeRegister = register('publicScope');

  const categoryRegister = register('series');

  return (
    <>
      <Form
        onSubmit={onFormdataSubmit}
        control={control}
        className='mx-auto max-w-[670px]'
      >
        <div className='mb-8 flex flex-col gap-[20px]'>
          <TitleInput label='제목' setValue={setValue} errors={errors} />
          <TagInput
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            errorMessage={errors.tag?.message}
          />
        </div>
        <ContentEditor setValue={setValue} getValues={getValues} />
        <div className='flex items-center justify-between pb-[60px] pt-10'>
          <PublicScopeSetting setValue={setValue} />
          <SeriesSetting setValue={setValue} selectList={selectList} />
        </div>
        <div className='bg-neutral-5 fixed bottom-0 left-0 flex w-full items-center justify-end gap-5 px-[60px] py-3'>
          <p className='text-B3R12 text-neutral-40'>자동 저장 완료 00:00:00</p>
          <Button type='button' size='s' label='임시저장' disabled={true} />
          <Button
            type='submit'
            size='s'
            label='등록하기'
            onClick={() => onFormdataSubmit}
          />
        </div>
      </Form>
    </>
  );
}

export default CommunityWriteForm;
