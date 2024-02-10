import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';

import { ProfileFormData } from '../page';

interface ImageInputProps {
  register: UseFormRegisterReturn<'image'>;
  watch: UseFormWatch<ProfileFormData>;
}

function ImageInput({ register, watch }: ImageInputProps) {
  const [newPrevImage, setNewPrevImage] = useState('');
  const previewImage = watch('image');

  useEffect(() => {
    if (previewImage && previewImage.length > 0) {
      const file = previewImage[0];
      const previewURL = URL.createObjectURL(file as File);
      setNewPrevImage(previewURL);
    }
  }, [previewImage]);

  return (
    <div className='flex w-[155px] flex-col gap-3'>
      <div className='size-[155px] overflow-hidden rounded-md'>
        {newPrevImage.length !== 0 ? (
          <Image
            src={newPrevImage}
            width={0}
            height={0}
            sizes='100%'
            className='size-full object-cover'
            alt=''
          />
        ) : (
          <>
            <Image
              src='https://s3-alpha-sig.figma.com/img/a48a/d045/fd6fb3f34cd304498a85c19b554563f5?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fK8jIUSUuYXiM9k~kk1f~cfLh1zzPCUbqlxJp~ToNIjKc~9~pbnYKYsgHl0ijSa-qEfsb-DEPuaopJQ-mJJ6zul0JfysNHBhqbHSxN-enKKgpt5ma6OIUANgaDPmUiwOUf5kOzo7ruECSNFvl0kG91wnyl59lS2ONhnBKtqTpYp5PE7Y2bW4j4R9YvBs6k91b02DrVbv4yeuwFjopoIImsls0snQAYI7nkFVuvxvtYaxKv2FSp6ONTI7mGnPF1ZvbLOt2hZ7KGauLC3TCVV6EBgN~RV1LZ~kmRs9RdRp491cKxRISjUU3YuraBnkv2fgR2gFfGHUDxonUkcdwKZ03A__'
              width={0}
              height={0}
              sizes='100%'
              className='size-full object-cover'
              alt=''
            />
          </>
        )}
      </div>
      <input
        {...register}
        type='file'
        id='profileImage'
        className='hidden'
        accept='image/*'
      />
      <label
        htmlFor='profileImage'
        className='flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#eee]'
      >
        프로필 사진 변경
      </label>
      <p className='text-B5R10 text-neutral-40'>
        20MB 이내의 이미지 파일을
        <br />
        업로드 해 주세요.
      </p>
    </div>
  );
}

export default ImageInput;
