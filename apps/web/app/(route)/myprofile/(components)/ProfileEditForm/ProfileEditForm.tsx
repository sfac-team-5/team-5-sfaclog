'use client';

import { Form, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

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
import { useRouter } from 'next/navigation';

interface ProfileEditFormProps {
  profile: UserType;
}

interface SNSDataType {
  type: string;
  url: string;
}
interface TransformedSNSDataType {
  [key: string]: string;
}

function transformSNSData(snsData: SNSDataType[]): TransformedSNSDataType {
  const transformedData: TransformedSNSDataType = {};
  const count: { [type: string]: number } = {}; // 각 SNS 타입별로 몇 번째 항목인지 카운트하기 위한 객체

  snsData.forEach((sns: SNSDataType) => {
    if (!count[sns.type]) {
      count[sns.type] = 1;
    } else {
      count[sns.type] += 1;
    }

    const key = `${sns.type}_${count[sns.type]}`;
    transformedData[key] = sns.url;
  });

  return transformedData;
}

function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const router = useRouter();
  const {
    register,
    setValue,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<UserType>({
    defaultValues: profile,
  });
  const { data: session, status, update } = useSession();

  const onFormdataSubmit = async ({ data }: { data: UserType }) => {
    const formData = new FormData();

    // 기타 데이터를 JSON 형식으로 변환하여 FormData에 추가
    // 파일을 제외한 나머지 데이터를 JSON 문자열로 변환
    const transformedSNSData = transformSNSData(data.sns);
    const jsonData = { ...data, sns: transformedSNSData };
    formData.append('data', JSON.stringify(jsonData));

    if (data.avatar instanceof FileList) {
      formData.append('avatar', data.avatar[0] as File);
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.id}/edit`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(result => {
        reset(result.record);
        const name = result.record.nickname;
        const image = result.record.avatarUrl;
        if (status === 'authenticated') update({ name, image });
        alert('프로필이 수정되었습니다.');
        router.push('/mypage');
        router.refresh();
      })
      .catch(error => {
        console.error(error);
      });
  };

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
            register={register}
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
              <p className='text-B2R14 text-neutral-90'>{profile.legalname}</p>
            </div>
            <NicknameInput register={register} errors={errors} />
          </div>
        </div>
        <PhoneInput register={register} errors={errors} />
        <SnsInput setValue={setValue} inputValues={profile.sns} />
        <CareerInput
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
          watch={watch}
        />
        <IntroInput register={register} />
        <UrlInput register={register} errors={errors} />
        <InterestsInput setValue={setValue} watch={watch} />
        <OffersInput setValue={setValue} watch={watch} />
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
