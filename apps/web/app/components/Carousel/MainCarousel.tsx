'use client';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carouselNavBtn.css';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  IconTaillessArrowLeftBlack,
  IconTaillessArrowRightBlack,
} from '@repo/ui/Icon';
import Image from 'next/image';

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
          <div className='absolute left-0 right-1/2 z-10 mr-[460px] h-[320px] cursor-pointer bg-white opacity-30' />
          <div className='absolute left-1/2 right-0 z-10 ml-[460px] h-[320px]  cursor-pointer  bg-white opacity-30' />
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={'auto'}
            centeredSlides
            observer
            pagination={{
              el: '.swiper-custom-pagination',
            }}
            speed={600}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            // onSlideChange={swiper => handleSlideChange(swiper)}
          >
            {Array.from({ length: 5 }, () => {}).map((v, idx) => (
              <SwiperSlide
                key={idx}
                className={`!h-[320px] !w-[920px] rounded-md ease-out`}
              >
                <Image
                  fill
                  src={`/images/carousel${idx + 1}.png`}
                  alt='image'
                  sizes='100%'
                  unoptimized
                  className={`rounded-md object-cover`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div>
            <button className='custom-prev'>
              <IconTaillessArrowLeftBlack className='stroke-neutral-90 size-6' />
            </button>
            <button className='custom-next '>
              <IconTaillessArrowRightBlack className='stroke-neutral-90 size-6' />
            </button>
            <div className='swiper-custom-pagination mt-10' />
          </div>
        </div>
      )}
    </>
  );
}
