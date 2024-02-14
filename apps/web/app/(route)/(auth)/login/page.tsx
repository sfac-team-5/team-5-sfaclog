import LoginForm from './(components)/LoginForm';
import LoginFormHeader from './(components)/LoginFormHeader';
import Footer from '@/components/Footer/Footer';

export default function page() {
  return (
    <>
      <main className='mx-auto flex min-h-[650px] w-[400px] flex-col justify-center pb-[85px] pt-[50px]'>
        <LoginFormHeader />
        <LoginForm />
      </main>

      <Footer />
    </>
  );
}
