'use server';

import PocketBase from 'pocketbase';
import { auth, signOut } from '@/auth';
export async function userDeleteAction(userId: string) {
  const pb = new PocketBase('http://3.35.176.72:8090');

  try {
    const result = await pb.collection('users').delete(userId);
    return { result, success: true };
  } catch (error: any) {
    console.log(error);
    return { success: false };
  }
}

export async function LogoutAction() {
  await signOut({ redirect: true, redirectTo: '/' });
}
