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
    <div className='relative mx-auto h-[285px] w-[1440px]'>
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
        <SwiperSlide className='mr-[18px] !h-[285px] !w-[560px] bg-neutral-10'>
          Slide 1
        </SwiperSlide>
        <SwiperSlide className='mr-[18px] !h-[285px] !w-[560px] bg-neutral-20'>
          Slide 2
        </SwiperSlide>
        <SwiperSlide className='mr-[18px] !h-[285px] !w-[560px] bg-neutral-30'>
          Slide 3
        </SwiperSlide>
        <SwiperSlide className='mr-[18px] !h-[285px] !w-[560px] bg-neutral-40'>
          Slide 4
        </SwiperSlide>
        <SwiperSlide className='mr-[18px] !h-[285px] !w-[560px] bg-neutral-50'>
          Slide 5
        </SwiperSlide>
        <SwiperSlide className='mr-[18px] !h-[285px] !w-[560px] bg-neutral-60'>
          Slide 6
        </SwiperSlide>
      </Swiper>
      <button
        ref={nextBtnRef}
        className='absolute right-5 top-24 z-10 text-2xl text-red-600'
      >
        NEXT
      </button>
      <button
        ref={prevBtnRef}
        className='absolute left-5 top-24 z-10 text-2xl text-red-600'
      >
        PREV
      </button>
    </div>
  );
}
