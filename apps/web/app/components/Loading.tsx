import Image from 'next/image';

export function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-[26px] bg-white'>
      <div className='relative size-[250px] overflow-hidden rounded-full'>
        <Image
          src='/svgs/LoadingBackground.svg'
          width={0}
          height={0}
          sizes='100%'
          className='size-full object-cover'
          alt='background'
        />
        <Image
          src='/svgs/LogoFooter.svg'
          width={72}
          height={51}
          className='animate-fadeAndShrink absolute left-1/2 top-1/2 origin-[50%_0%]'
          alt='logo'
        />
        <Image
          src='/svgs/LoadingCharacter.svg'
          width={230}
          height={220}
          className='animate-rise absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
          alt='character'
        />
      </div>
      <div className='relative'>
        <p className='text-[20px] font-bold tracking-[7px]'>Loading</p>
        <div className='animate-slideOutAndIn absolute bottom-0 left-[-10%] h-7 w-5 -translate-x-1/2 rounded-xl bg-white/80'></div>
      </div>
    </div>
  );
}
