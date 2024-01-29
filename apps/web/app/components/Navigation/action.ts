'use server';

import { signOut } from 'next-auth/react';
import PocketBase from 'pocketbase';

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
