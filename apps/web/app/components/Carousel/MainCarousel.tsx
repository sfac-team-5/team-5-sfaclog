'use client';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import './carouselNavBtn.css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  IconTaillessArrowLeftBlack,
  IconTaillessArrowRightBlack,
} from '@repo/ui/Icon';
import Image from 'next/image';

const random = [1, 3, 4, 2, 5, 4, 1, 2, 5, 3];

export function MainCarousel() {
  const [loading, setLoading] = useState(false);
  // const [centerIndex, setCenterIndex] = useState(0);
  useEffect(() => {
    setLoading(() => true);
  }, []);

  // const handleSlideChange = (swiper: any) => {
  //   setCenterIndex(swiper.realIndex);
  // };

  return (
    <>
      {loading && (
        <div className='relative mx-auto mt-[52px] w-full'>
          <div className='absolute left-0 right-1/2 z-10 mr-[300px] h-[320px] cursor-pointer bg-white opacity-30' />
          <div className='absolute left-1/2 right-0 z-10 ml-[300px] h-[320px]  cursor-pointer  bg-white opacity-30' />
          <Swiper
            modules={[Navigation]}
            slidesPerView={'auto'}
            centeredSlides
            spaceBetween={18}
            loop
            speed={600}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            // onSlideChange={swiper => handleSlideChange(swiper)}
            // onBeforeTransitionStart={swiper => handleSlideChange(swiper)}
          >
            {random.map((v, idx) => (
              <SwiperSlide
                key={idx}
                className={`!h-[320px] !w-[580px] rounded-md ease-out`}
              >
                <Image
                  fill
                  src={`/images/carousel${v}.png`}
                  alt='image'
                  sizes='100%'
                  className={`rounded-md object-cover`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className='custom-prev'>
            <IconTaillessArrowLeftBlack />
          </button>
          <button className='custom-next'>
            <IconTaillessArrowRightBlack />
          </button>
        </div>
      )}
    </>
  );
}
