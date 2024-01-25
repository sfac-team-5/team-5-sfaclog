'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

export const Client = () => {
  const sessionData = useSession();
  return <div>client session Data = {JSON.stringify(sessionData)}</div>;
};
