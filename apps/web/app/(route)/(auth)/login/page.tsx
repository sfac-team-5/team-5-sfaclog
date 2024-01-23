'use client';

import React, { useState } from 'react';

export default function page() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('http://localhost:3000/api/pocket', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='id'
        onChange={onChange}
        className='border px-2 py-1'
      />
      <input
        type='password'
        name='password'
        onChange={onChange}
        className='border px-2 py-1'
      />
      <button type='submit'>제출</button>
    </form>
  );
}
