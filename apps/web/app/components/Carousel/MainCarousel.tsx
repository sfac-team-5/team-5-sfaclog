'use client';
import React, { useRef, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './carouselNavBtn.css';
import {
  IconTaillessArrowLeftBlack,
  IconTaillessArrowRightBlack,
} from '@repo/ui/Icon';

export function MainCarousel() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(() => true);
  }, []);

  return (
    <>
      {loading && (
        <div className='relative mx-auto mt-[52px] w-full'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={'auto'}
            initialSlide={1}
            centeredSlides
            loop
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
          >
            <SwiperSlide className='mr-[18px] !h-[320px] !w-[580px] bg-neutral-10'>
              Slide 1
            </SwiperSlide>
            <SwiperSlide className='mr-[18px] !h-[320px] !w-[580px] bg-neutral-20'>
              Slide 2
            </SwiperSlide>
            <SwiperSlide className='mr-[18px] !h-[320px] !w-[580px] bg-neutral-30'>
              Slide 3
            </SwiperSlide>
            <SwiperSlide className='mr-[18px] !h-[320px] !w-[580px] bg-neutral-30'>
              Slide 4
            </SwiperSlide>
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
