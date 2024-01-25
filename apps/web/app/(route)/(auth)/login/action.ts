'use server';
import { signIn } from '@/auth';

export async function submitAction(data) {
  console.log(data);

  const res = await signIn('credentials', {
    id: data.id,
    password: data.password,
  });

  console.log('server action', res);

  if (!res?.ok) {
    const errorMessage = res?.error || 'Unknown error occurred';
    console.error('Login failed:', errorMessage);
    return 'fail';
  }
  //   if (!res.ok) return 'fail';
}
