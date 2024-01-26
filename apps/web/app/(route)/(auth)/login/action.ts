'use server';
import { signIn } from '@/auth';
import { LoginInputType } from './page';
export async function submitAction(data: LoginInputType) {
  try {
    await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    return { loginSuccess: true };
  } catch (err) {
    return { loginSuccess: false };
  }
}
