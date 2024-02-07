'use server';
//인증 메일 재전송 로직
import PocketBase from 'pocketbase';
export const repeatVerifyEmail = async (emailAddress: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const verify = await pb
      .collection('users')
      .requestVerification(emailAddress);
    console.log('repeat', verify);
    return verify;
  } catch (error) {
    return false;
  }
};
