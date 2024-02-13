import {
  IconSnsBrunch,
  IconSnsGithub,
  IconSnsInstagram,
  IconSnsLinkedin,
  IconSnsNotion,
  IconSnsX,
  IconSnsYoutube,
} from '@repo/ui/Icon';
import Link from 'next/link';
import React from 'react';

interface ProfileSNSProps {
  sns: any;
}

const 아이콘결정함수 = (sns: string) => {
  if (sns.startsWith('Github')) {
    return <IconSnsGithub />;
  } else if (sns.startsWith('LinkedIn')) {
    return <IconSnsLinkedin />;
  } else if (sns.startsWith('Instagram')) {
    return <IconSnsInstagram />;
  } else if (sns.startsWith('Notion')) {
    return <IconSnsNotion />;
  } else if (sns.startsWith('Brunch')) {
    return <IconSnsBrunch />;
  } else if (sns.startsWith('Youtube')) {
    return <IconSnsYoutube />;
  } else if (sns.startsWith('X')) {
    return <IconSnsX />;
  }
};

export function ProfileSNS({ sns }: ProfileSNSProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='mb-3 text-B1B16'>SNS</div>
      <div className='flex flex-wrap gap-5'>
        {Object.entries(sns).map((el, idx) => (
          <Link key={idx} href={`${el[1]}`}>
            <div className='size-[28px]'>{아이콘결정함수(el[0])}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
