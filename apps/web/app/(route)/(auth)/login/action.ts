'use server';
import { signIn } from '@/auth';
import { LoginInputType } from './page';

export async function submitAction(data: LoginInputType) {
  console.log(data);
  try {
    await signIn('credentials', {
      id: data.id,
      password: data.password,
      redirect: false,
    });
    return { loginSuccess: true };
  } catch (err) {
    return { loginSuccess: false };
  }
}
