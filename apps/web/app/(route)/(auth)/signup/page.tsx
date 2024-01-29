'use client';
import { useForm } from 'react-hook-form';
import NameInput from './(components)/NameInput';
import EmailInput from './(components)/EmailInput';
import PasswordInput from './(components)/PasswordInput';
import PasswordConfirmInput from './(components)/PasswordConfirmInput';
import AgreementInput from './(components)/AgreementInput';

export interface SignupInputType {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  agreement: boolean;
}

function page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      agreement: false,
    },
  });
  const password = watch('password');

  const onSubmit = async (data: SignupInputType) => {
    const requestData = {
      ...data,
      action: 'signup',
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        },
      );
      const responseData = await response.json();

      if (responseData.status !== 200) {
        alert(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nameRegister = register('name', {
    required: '아이디를 입력해 주세요.',
  });

  const emailRegister = register('email', {
    required: '이메일을 입력해 주세요.',
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      message: '이메일 형식을 확인해 주세요.',
    },
  });

  const passwordRegister = register('password', {
    required: '비밀번호를 입력해 주세요.',
    // pattern: {
    //   value:
    //     /^(?=(?:.*[a-z]){0,1}(?:.*[A-Z]){0,1}(?:.*\d){0,1}(?:.*[!@#$%^&*()_]){0,1}.{10,16})[a-zA-Z\d!@#$%^&*()_]{10,16}$/,
    //   message:
    //     '비밀번호는 대소문자, 숫자, 특수문자를 2가지 이상 포함하여 10-16자로 입력해 주세요.',
    // },
  });

  const passwordConfirmRegister = register('passwordConfirm', {
    required: '비밀번호를 한 번 더 입력해 주세요.',
    validate: value => value === password || '비밀번호가 일치하지 않습니다.',
  });

  const agreementRegister = register('agreement', {
    required: '약관 동의는 필수입니다.',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col w-[500px] gap-2'
    >
      <div className='flex'>
        <NameInput register={nameRegister} errors={errors} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className='flex'>
        <EmailInput register={emailRegister} errors={errors} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className='flex'>
        <PasswordInput register={passwordRegister} errors={errors} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className='flex'>
        <PasswordConfirmInput
          register={passwordConfirmRegister}
          errors={errors}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>
      <div className='flex'>
        <label>
          <AgreementInput register={agreementRegister} />
          본인 인증 약관 전체 동의 (필수)
        </label>
        {errors.agreement && <p>{errors.agreement.message}</p>}
      </div>
      <button type='submit'>제출</button>
    </form>
  );
}

export default page;
