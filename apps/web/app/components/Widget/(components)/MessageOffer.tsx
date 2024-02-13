import Image from 'next/image';
import MessageTime from './MessageTime';
import { MessageType } from '@/types';
import { MessageOfferText } from './MessageOfferText';
import SecondaryButton from '@repo/ui/SecondaryButton';
import GhostButton from '@repo/ui/GhostButton';

interface MessageOfferProps {
  type: MessageType;
}

export function MessageOffer({ type }: MessageOfferProps) {
  return (
    <div
      className={`mb-[15px] flex w-full items-end gap-1 ${type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
    >
      {type === 'outgoing' && (
        <MessageTime isRead={true} time='오후 3:55' type='outgoing' />
      )}
      <div
        className={`w-[250px] overflow-hidden rounded-md border border-neutral-30 ${type === 'outgoing' ? 'rounded-br-none' : 'rounded-bl-none'}`}
      >
        <div className='relative h-[75px] w-full '>
          <Image
            src='/images/MessageOfferBackground.png'
            alt={`offer background image`}
            width={0}
            height={0}
            sizes='100%'
            className='size-full object-cover'
          />
          <p className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-B3B12 text-white'>
            뜨거운 감자 님으로부터
            <br />
            프로젝트 제안이 도착했어요!
          </p>
        </div>

        <div>
          <MessageOfferText label='회사명' contents='스팩컴퍼니' />
          <MessageOfferText label='연봉' contents='Description' />
          <MessageOfferText label='근무지' contents='Description' />
          <MessageOfferText
            label='회사 소개 및 업무 내용'
            contents={`안녕하세요.
            스팩컴퍼니 인사담당자 나라입니다.
            귀하는 더미더미더미
            
            감사합니다.`}
          />
        </div>

        <div className='flex flex-col gap-1.5 px-2 py-5'>
          <p className='text-B5R10 text-neutral-70'>
            버튼을 클릭하여 대화를 시작해보세요 👀
          </p>
          <div className='flex justify-between gap-1.5'>
            <GhostButton type='button' size='s' label='제안 거절' />
            <SecondaryButton type='button' size='s' label='제안 수락' />
          </div>
        </div>
      </div>
      {type === 'incoming' && (
        <MessageTime isRead={true} time='오후 3:55' type='incoming' />
      )}
    </div>
  );
}
