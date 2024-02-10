import { Selectbox } from '@repo/ui/SelectBox';
import { InputBox } from '@repo/ui/InputBox';
import {
  IconCancelBoxGray,
  IconPlusBlack,
  IconSnsBrunch,
  IconSnsGithub,
  IconSnsInstagram,
  IconSnsLink,
  IconSnsLinkedin,
  IconSnsNotion,
  IconSnsX,
  IconSnsYoutube,
} from '@repo/ui/Icon';
import InputTitle from './InputTitle';
import InputAddButton from './InputAddButton';

interface SnsInputProps {
  setValue: any;
  errors: any;
}
const selectList = [
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='Link'
      >
        <IconSnsLink />
        Link
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='Github'
      >
        <IconSnsGithub />
        Github
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='Instagram'
      >
        <IconSnsInstagram />
        Instagram
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='Notion'
      >
        <IconSnsNotion />
        Notion
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='X'
      >
        <IconSnsX />X (twitter)
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='Brunch'
      >
        <IconSnsBrunch />
        Brunch
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='Youtube'
      >
        <IconSnsYoutube />
        Youtube
      </div>
    ),
  },
  {
    value: (
      <div
        className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'
        data-value='LinkedIn'
      >
        <IconSnsLinkedin />
        LinkedIn
      </div>
    ),
  },
];

function SnsInput({ setValue, errors }: SnsInputProps) {
  const handleValueChange = (value: string) => {
    setValue('sns', value);
  };

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='SNS' />

      <div className='flex items-center gap-2'>
        <Selectbox
          width='short'
          selectList={selectList}
          onChange={data => console.log(data)}
        />
        <div className='w-[238px]'>
          <InputBox placeholder='htts://' />
        </div>
        <IconCancelBoxGray className='cursor-pointer' />
      </div>

      <div className='flex items-center gap-2'>
        <Selectbox
          width='short'
          selectList={selectList}
          onChange={data => console.log(data)}
        />
        <div className='w-[238px]'>
          <InputBox placeholder='htts://' />
        </div>
        <IconCancelBoxGray className='cursor-pointer' />
      </div>

      <InputAddButton />
    </div>
  );
}

export default SnsInput;
