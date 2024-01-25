'use client';
import { useForm } from 'react-hook-form';

export interface formDataProps {
  name: string;
  email: string;
  password: string;
}

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        {...register('name', {
          required: '이름를 입력해 주세요.',
        })}
        type='text'
        placeholder='이름'
        className='border px-2 py-1'
      />
      <input
        {...register('email', {
          required: '이메일을 입력해 주세요.',
          pattern:
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        })}
        type='text'
        placeholder='이메일'
        className='border px-2 py-1'
      />
      <input
        {...register('password', {
          required: '비밀번호를 입력해 주세요.',
          pattern:
            /^(?=(?:.*[a-z]){0,1}(?:.*[A-Z]){0,1}(?:.*\d){0,1}(?:.*[!@#$%^&*()_]){0,1}.{10,16})[a-zA-Z\d!@#$%^&*()_]{10,16}$/,
        })}
        type='password'
        placeholder='비밀번호'
        className='border px-2 py-1'
      />
      <input
        {...register('password', {
          required: '비밀번호를 한 번 더 입력해 주세요.',
        })}
        type='password'
        placeholder='비밀번호 확인'
        className='border px-2 py-1'
      />
      <button type='submit'>제출</button>
    </form>
  );
}

export default page;
