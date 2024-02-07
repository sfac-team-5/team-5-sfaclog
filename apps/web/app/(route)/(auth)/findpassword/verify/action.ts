'use server';

//비밀번호 재설정 인증 메일 재전송 로직
import PocketBase from 'pocketbase';
export const repeatChangePasswordEmail = async (emailAddress: string) => {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
    const verify = await pb
      .collection('users')
      .requestPasswordReset(emailAddress);
    return verify;
  } catch (error) {
    return false;
  }
};
