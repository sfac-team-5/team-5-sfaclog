'use client';
import React from 'react';
import Button from '@repo/ui/Button';
import { InputBox } from '@repo/ui/InputBox';
import { Selectbox } from '@repo/ui/SelectBox';
import { IconCaution } from '@public/svgs';
import { useForm } from 'react-hook-form';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useModalDataActions } from '@/hooks/stores/useModalStore';

const selectList = [
  { value: 'UX/UI가 불편해서' },
  { value: '광고가 너무 많아서' },
  { value: '잘 사용하지 않아서' },
  { value: '개인정보가 걱정되서' },
  { value: '중복 계정이 존재해서' },
  { value: '기타' },
];

interface DeleteAccountType {
  reason: string;
  password: string;
  email: string;
}

export function DeleteAccountForm() {
  const session = useSession();
  const router = useRouter();
  const { onChange: changeModalData } = useModalDataActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<DeleteAccountType>({
    defaultValues: {
      reason: '',
      password: '',
      email: '',
    },
  });

  const passwordRegister = register('password', {
    required: '비밀번호를 입력해 주세요.',
  });

  const handleFormSubmit = async (data: DeleteAccountType) => {
    if (!session.data?.user.email) {
      alert('로그인 상태가 아닙니다');
      return;
    }
    if (!data.reason) {
      alert('탈퇴사유를 선택해주세요.');
      return;
    }

    data = { ...data, email: session.data?.user.email };

    changeModalData({
      title: '정말 탈퇴하시겠습니까?',
      description: '회원님의 정보가 삭제됩니다.',
      action: async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`,
          {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          router.back();
          alert('비밀번호를 확인해주세요!');
        } else {
          await signOut();
          router.push('/');
          alert('회원탈퇴가 완료되었습니다.');
        }
      },
    });
    router.push(`/modal`, {
      scroll: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='mx-auto my-10 flex w-[400px] flex-col items-center  justify-center gap-[45px]'
    >
      <div>
        <div className='relative my-[10px] flex justify-center'>
          <IconCaution className='absolute bottom-4 left-7' />
          <span className='text-H3M18 text-text-primary'>주의하세요</span>
        </div>
        <div className='text-B3R12 text-text-secondary'>
          탈퇴시 삭제되니 정보는 복구가 불가능합니다.
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='text-center text-B2M14 text-text-primary'>
          불편하셨던 점과 불만사항을 알려주시면 적극 반영해 고객님의 불편함을
          해결할 수 있도록 노력하겠습니다.
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-B1M16 text-text-primary'>
            무엇이 불편하셨나요?
          </div>
          <Selectbox
            placeholder='무엇이 불편하셨나요?'
            selectList={selectList}
            width='long'
            onChange={data => setValue('reason', data.value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-B1M16 text-text-primary'>비밀번호 입력</div>
          <InputBox
            placeholder='현재 비밀번호를 입력해주세요.'
            errorMessage={errors.password?.message}
            onValueChange={password => setValue('password', password)}
          />
        </div>
      </div>
      <Button label='탈퇴하기' size='l' type='submit' />
    </form>
  );
}
