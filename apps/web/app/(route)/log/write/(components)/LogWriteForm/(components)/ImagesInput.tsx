import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import { IconPlusGray } from '@repo/ui/Icon';
import { LogFormData } from '../LogWriteForm';

interface ImagesInputProps {
  register: UseFormRegisterReturn<'thumbnail'>;
  watch: UseFormWatch<LogFormData>;
}

function ImagesInput({ register, watch }: ImagesInputProps) {
  const [newPrevImage, setNewPrevImage] = useState('');
  const previewImage = watch('thumbnail');

  useEffect(() => {
    if (previewImage && previewImage.length > 0) {
      const file = previewImage[0];
      const previewURL = URL.createObjectURL(file as File);
      setNewPrevImage(previewURL);
    }
  }, [previewImage]);

  return (
    <div>
      <div>
        <label
          htmlFor='thumbnail'
          className='bg-neutral-5 border-stroke-30 relative flex aspect-square w-[198px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border'
        >
          {newPrevImage.length !== 0 ? (
            <Image src={newPrevImage} alt='preview' fill objectFit='cover' />
          ) : (
            <>
              <IconPlusGray />
              <span className='text-B3R12 text-text-gray'>썸네일 추가</span>
            </>
          )}
        </label>
      </div>
      <input
        {...register}
        type='file'
        id='thumbnail'
        className='hidden'
        accept='image/*'
      />
    </div>
  );
}

export default ImagesInput;
