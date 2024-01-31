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
        <div className='relative mx-auto mt-[52px] w-[1440px]'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={'auto'}
            centeredSlides
            loop
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
          >
            <SwiperSlide className='bg-neutral-10 mr-[18px] !h-[320px] !w-[580px]'>
              Slide 1
            </SwiperSlide>
            <SwiperSlide className='bg-neutral-20 mr-[18px] !h-[320px] !w-[580px]'>
              Slide 2
            </SwiperSlide>
            <SwiperSlide className='bg-neutral-30 mr-[18px] !h-[320px] !w-[580px]'>
              Slide 3
            </SwiperSlide>
            <SwiperSlide className='bg-neutral-40 mr-[18px] !h-[320px]  !w-[580px] '>
              Slide 4
            </SwiperSlide>
            <SwiperSlide className='mr-[18px] !h-[320px] !w-[580px] bg-neutral-50 '>
              Slide 5
            </SwiperSlide>
            <SwiperSlide className='bg-neutral-60 mr-[18px] !h-[320px] !w-[580px]'>
              Slide 6
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
