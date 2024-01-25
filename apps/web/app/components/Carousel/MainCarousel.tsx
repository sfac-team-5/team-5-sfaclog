'use client';
import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
export function MainCarousel() {
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <div className='relative h-[285px] mx-auto w-[1440px]'>
      <Swiper
        modules={[Navigation]}
        loop
        slidesPerView={'auto'}
        observer
        observeParents
        centeredSlides
        navigation={{
          prevEl: null,
          nextEl: null,
        }}
        onInit={swiper => {
          //@ts-ignore
          swiper.params.navigation.nextEl = nextBtnRef.current;
          //@ts-ignore
          swiper.params.navigation.prevEl = prevBtnRef.current;
          swiper.navigation.init();
        }}
      >
        <SwiperSlide className='!w-[560px] !h-[285px] bg-neutral-10 mr-[18px]'>
          Slide 1
        </SwiperSlide>
        <SwiperSlide className='!w-[560px] !h-[285px] bg-neutral-20 mr-[18px]'>
          Slide 2
        </SwiperSlide>
        <SwiperSlide className='!w-[560px] !h-[285px] bg-neutral-30 mr-[18px]'>
          Slide 3
        </SwiperSlide>
        <SwiperSlide className='!w-[560px] !h-[285px] bg-neutral-40 mr-[18px]'>
          Slide 4
        </SwiperSlide>
        <SwiperSlide className='!w-[560px] !h-[285px] bg-neutral-50 mr-[18px]'>
          Slide 5
        </SwiperSlide>
        <SwiperSlide className='!w-[560px] !h-[285px] bg-neutral-60 mr-[18px]'>
          Slide 6
        </SwiperSlide>
      </Swiper>
      <button
        ref={nextBtnRef}
        className='absolute right-5 top-24 z-10 text-red-600 text-2xl'
      >
        NEXT
      </button>
      <button
        ref={prevBtnRef}
        className='absolute left-5 top-24 z-10 text-red-600 text-2xl'
      >
        PREV
      </button>
    </div>
  );
}
