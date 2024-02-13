'use server';
import { revalidatePath } from 'next/cache';

export const editProfileApi = async ({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/edit`, {
    method: 'POST',
    body: formData,
  });
  revalidatePath('/', 'layout');
};
