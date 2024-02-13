'use server';
//회원가입
export async function SignUpSubmitAction(data: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
}
