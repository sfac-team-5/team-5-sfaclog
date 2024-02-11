'use sever';

//회원탈퇴하기
interface DeleteAccountType {
  reason: string;
  password: string;
  email: string;
}
export const SubmitDeleteAccount = async (data: DeleteAccountType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`,
    {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();

  return result;
};
