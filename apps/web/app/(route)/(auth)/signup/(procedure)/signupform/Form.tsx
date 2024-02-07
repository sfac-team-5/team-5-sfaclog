'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputCustom } from './Input';
import { Check } from '@repo/ui/Check';
import Button from '@repo/ui/Button';
import { useRouter } from 'next/navigation';
import { SignUpSubmitAction } from './action';

interface SignUpType {
  username: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const interestsList = [
  { label: '프론트엔드', value: 'Frontend' },
  { label: '백엔드', value: 'Backend' },
  { label: '데이터 분석', value: 'Data' },
  // { label: '서버 개발', value: 'Server' },
  { label: 'DBA', value: 'DBA' },
  { label: 'iOS 개발', value: 'iOS' },
  { label: '안드로이드 개발', value: 'Android' },
];
const proposalsList = [
  { label: '채용 제안', value: 'Recruitment' },
  { label: '의견 제안', value: 'Opinion' },
  { label: '프로젝트 제안', value: 'Project' },
];
export function Form() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkDuplEmail, setCheckDuplEmail] = useState(false);
  const [checkDuplNickname, setCheckDuplNickname] = useState(false);
  const [checkPwValidation, setCheckPwValidation] = useState(false);
  const [checkPasswordConfirm, setPasswordConfirm] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [proposals, setProposals] = useState<string[]>([]);
  const handleInterests = ({ value }: { value: string }) => {
    if (interests.includes(value)) {
      setInterests(prev => prev.filter(el => el !== value));
    } else {
      setInterests(prev => [...prev, value]);
    }
  };

  const handleProposals = ({ value }: { value: string }) => {
    if (proposals.includes(value)) {
      setProposals(prev => prev.filter(el => el !== value));
    } else {
      setProposals(prev => [...prev, value]);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpType>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const controller = new AbortController();
  const checkEmail = async (value: string) => {
    //캐싱을 위해 SWR 이나  최적화 문제로 디바운스가 필요함
    //현재는 onChange이벤트에 fetching 하도록 구현되어있음
    if (value === '') return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/search?type=email&data=${value}`,
      { signal: controller.signal },
    );
    if (!response.ok) throw Error('email duplication check error');
    const result = await response.json();
    console.log('result = ', result);
    if (result.isDuplicate) {
      setCheckDuplEmail(() => false);
      // setError('email', { message: '이미 사용 중인 이메일 입니다' });
      return '이미 사용 중인 이메일 입니다';
    } else if (!result.isDuplicate) {
      clearErrors('email');
      setCheckDuplEmail(() => true);
      return true;
    }
  };

  const checkNickName = async (value: string) => {
    if (value === '') return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/search?type=nickname&data=${value}`,
      { signal: controller.signal },
    );
    if (!response.ok) throw Error('nickname duplication check error');
    const result = await response.json();
    console.log('result = ', result);
    if (result.isDuplicate) {
      setCheckDuplNickname(() => false);
      return '이미 사용 중인 닉네임 입니다';
    } else if (!result.isDuplicate) {
      clearErrors('nickname');
      setCheckDuplNickname(() => true);
      return true;
    }
  };

  useEffect(() => {
    if (!errors.password && password.length >= 8) {
      setCheckPwValidation(() => true);
    } else {
      setCheckPwValidation(() => false);
    }
  }, [errors.password]);

  const checkPasswordIsEqual = (value: string) => {
    if (password === value) {
      setPasswordConfirm(() => true);
      clearErrors('passwordConfirm');
      return true;
    } else {
      setPasswordConfirm(() => false);
      return false;
    }
  };

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(() => true);
    await trigger();
    // console.log(data);
    // console.log(interests);
    // console.log(proposals);
    data = { ...data, interests, proposals };
    console.log('submit data', data);
    const result = await SignUpSubmitAction(data);
    if (result) {
      console.log('생성완료');
      router.push(`/signup/verify?email=${data.email}`);
    } else {
      console.log('생성실패');
      setIsSubmitting(() => false);
      alert('오류가 발생 하였습니다.');
    }
  };

  if (isSubmitting)
    return <div className='text-H0M32 text-center'>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='mx-auto w-fit'>
      <div className='flex flex-col gap-8'>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>이름</div>
          <InputCustom
            type='text'
            errorMessage={errors.username?.message || undefined}
            {...register('username', {
              required: '이름을 입력해 주세요.',
            })}
          />
        </div>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>닉네임</div>
          <InputCustom
            type='text'
            hint='2~12자 이내로 입력해주세요.'
            placeholder='닉네임을 입력해 주세요.'
            errorMessage={errors.nickname?.message || undefined}
            successMessage={
              checkDuplNickname ? '사용 가능한 닉네임 입니다.' : undefined
            }
            {...register('nickname', {
              required: '닉네임을 입력해 주세요.',
              validate: async value => await checkNickName(value),
            })}
          />
        </div>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>이메일</div>
          <InputCustom
            type='text'
            hint='이메일 예시: abcde123@gmail.com'
            errorMessage={errors.email?.message || undefined}
            successMessage={
              checkDuplEmail ? '사용 가능한 이메일 입니다.' : undefined
            }
            {...register('email', {
              required: '이메일을 입력해 주세요.',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: '이메일 형식을 확인해 주세요.',
              },
              validate: async value => await checkEmail(value),
            })}
          />
        </div>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>비밀번호</div>
          <InputCustom
            type='password'
            hint={
              !password
                ? '8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다'
                : undefined
            }
            successMessage={
              checkPwValidation ? '사용가능한 비밀번호 입니다.' : undefined
            }
            errorMessage={errors.password?.message || undefined}
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              pattern: {
                value: /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(.{8,})$/,
                message: '규칙에 맞지 않는 비밀번호 입니다.',
              },
              onChange: e => {
                if (
                  e.target.value !== passwordConfirm &&
                  passwordConfirm.length > 0
                ) {
                  setError('passwordConfirm', {
                    message: '비밀번호가 일치 하지 않습니다.',
                  });
                }
              },
            })}
          />
        </div>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>비밀번호 확인</div>
          <InputCustom
            type='password'
            errorMessage={errors.passwordConfirm?.message || undefined}
            successMessage={
              checkPasswordConfirm ? '비밀번호가 일치합니다.' : undefined
            }
            {...register('passwordConfirm', {
              required: '비밀번호를 한 번 더 입력해 주세요.',
              validate: value =>
                checkPasswordIsEqual(value) || '비밀번호가 일치 하지 않습니다.',
              // onChange: e => checkPassword(e.target.value),
            })}
          />
        </div>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>관심 분야</div>
          <div className='flex flex-wrap'>
            {interestsList.map(item => (
              <div className='w-1/2' key={item.value}>
                <Check
                  name='interests'
                  value={item.value}
                  label={item.label}
                  onChange={handleInterests}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-[400px] flex-col gap-3'>
          <div className='text-B1M16'>제안 허용</div>
          <div className='flex flex-wrap'>
            {proposalsList.map(item => (
              <div className='w-full' key={item.value}>
                <Check
                  name='interests'
                  value={item.value}
                  label={item.label}
                  onChange={handleProposals}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mb-32 mt-6'>
        <Button
          label='이전'
          size='m'
          type='button'
          onClick={() => router.back()}
        />
        <Button label='다음' size='m' type='submit' />
      </div>
    </form>
  );
}
