import { Selectbox } from '@repo/ui/SelectBox';
import { InputBox } from '@repo/ui/InputBox';
import {
  IconCancelBoxGray,
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
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const selectList = [
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsLink />
        Link
      </div>
    ),
    dataValue: 'Link',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsGithub />
        Github
      </div>
    ),
    dataValue: 'Github',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsInstagram />
        Instagram
      </div>
    ),
    dataValue: 'Instagram',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsNotion />
        Notion
      </div>
    ),
    dataValue: 'Notion',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsX />X (twitter)
      </div>
    ),
    dataValue: 'X',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsBrunch />
        Brunch
      </div>
    ),
    dataValue: 'Brunch',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsYoutube />
        Youtube
      </div>
    ),
    dataValue: 'Youtube',
  },
  {
    value: (
      <div className='flex h-6 w-[110px] items-center justify-start gap-1.5 text-B3R12'>
        <IconSnsLinkedin />
        LinkedIn
      </div>
    ),
    dataValue: 'LinkedIn',
  },
];

interface SnsInputProps {
  setValue: any;
  inputValues: any;
}

function SnsInput({ setValue, inputValues }: SnsInputProps) {
  const [snsInputs, setSnsInputs] = useState([{ type: '', url: '' }]);
  const maxInputs = 8; // 최대 입력 가능한 SNS 개수

  const addInput = () => {
    if (snsInputs.length < maxInputs) {
      setSnsInputs([...snsInputs, { type: '', url: '' }]);
    }
  };

  const removeInput = (index: number) => {
    if (snsInputs.length === 1) {
      setSnsInputs([{ type: 'Link', url: '' }]);
    } else {
      setSnsInputs(snsInputs.filter((_, i) => i !== index));
    }
  };

  const findSelectedOption = (type: React.ReactNode) => {
    return selectList.find(option => option.dataValue === type);
  };

  // snsInputs 초기 값 설정
  useEffect(() => {
    if (inputValues && Object.keys(inputValues).length > 0) {
      const inputs = Object.entries(inputValues).map(([key, value]) => ({
        type: key.split('_')[0] || '', // "Github", "Linkedin" 등의 타입 추출
        url: value as string,
      }));
      setSnsInputs(inputs);
    }
  }, [inputValues]);

  useEffect(() => {
    setValue('sns', snsInputs); // sns 필드 업데이트
  }, [snsInputs, setValue]);

  return (
    <div className='flex flex-col gap-3'>
      <InputTitle label='SNS' />

      {snsInputs.map((input, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Selectbox
            width='short'
            selectList={selectList}
            selectedOption={findSelectedOption(input.type)}
            onChange={e => {
              const selectedType = e.dataValue;
              const updatedInputs = snsInputs.map((item, i) => {
                if (i === index) {
                  return { ...item, type: selectedType };
                }
                return item;
              });
              setSnsInputs(updatedInputs);
            }}
          />
          <div className='w-[238px]'>
            <InputBox
              placeholder='https://'
              value={input.url}
              onChange={e => {
                const updatedInputs = snsInputs.map((item, i) => {
                  if (i === index) {
                    return { ...item, url: e.target.value };
                  }
                  return item;
                });
                setSnsInputs(updatedInputs);
              }}
            />
          </div>
          <IconCancelBoxGray
            className='cursor-pointer'
            onClick={() => removeInput(index)}
          />
        </div>
      ))}

      {snsInputs.length < maxInputs && <InputAddButton onClick={addInput} />}
      {snsInputs.length >= maxInputs && (
        <div className='text-B3R12 text-brand-100'>
          최대 8개까지 입력할 수 있어요.
        </div>
      )}
    </div>
  );
}

export default SnsInput;
