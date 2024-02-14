import FindPasswordFormHeader from './(components)/FindPasswordFormHeader';
import FindPasswordForm from './(components)/FindPasswordForm';
import Footer from '@/components/Footer/Footer';

export default function page() {
  return (
    <>
      <main className='mx-auto flex min-h-[650px] w-[400px] flex-col justify-center pb-[85px] pt-[50px]'>
        <FindPasswordFormHeader
          description='가입시 사용한 이름과 이메일을 입력해주세요.'
          title='비밀번호 찾기'
        />
        <FindPasswordForm />
      </main>

      <Footer />
    </>
  );
}
