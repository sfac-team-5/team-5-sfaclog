'use server';
import { LogFormData } from '@/(route)/log/write/(components)/LogWriteForm/LogWriteForm';
import { revalidatePath } from 'next/cache';

export const editLogApi = async ({
  formData,
  data,
  id,
}: {
  formData: FormData;
  data: LogFormData;
  id: string;
}) => {
  if (data.tag) {
    for (const tag of data.tag) {
      formData.append('tags', tag);
    }
  }

  formData.set('title', data.title);
  formData.set('content', data.content);
  formData.set('publicScope', JSON.stringify(data.publicScope));
  formData.set('thumbnail', data.thumbnail && (data.thumbnail[0] as any));
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${id}`, {
    method: 'PUT',
    body: formData,
  });
  revalidatePath(`/log/${id}`);
};
