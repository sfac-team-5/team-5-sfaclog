'use server';
import { revalidatePath } from 'next/cache';

export const editLogApi = async ({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`, {
    method: 'PUT',
    body: formData,
  });
  revalidatePath(`/log/${id}`);
};
