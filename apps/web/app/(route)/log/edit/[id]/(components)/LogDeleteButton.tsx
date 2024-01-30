'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LogDeleteButtonProps {
  logId: string;
}

function LogDeleteButton({ logId }: LogDeleteButtonProps) {
  const router = useRouter();
  const onDeleteLog = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/log/${logId}`,
      {
        method: 'DELETE',
      },
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      router.push('/');
    }
  };
  return <button onClick={onDeleteLog}>Delete</button>;
}

export default LogDeleteButton;
