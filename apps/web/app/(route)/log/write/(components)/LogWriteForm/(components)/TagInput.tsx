import React, { useEffect, useRef, useState } from 'react';
import { IconCancelGray } from '@public/svgs';
// import { LogFormData } from '../LogWriteForm';
// import { CommunityFormData } from '@/(route)/community/write/(components)/CommunityWriteForm';

interface TagInputProps {
  setValue: any;
  setError: any;
  clearErrors: any;
  errorMessage?: string;
}

export default function TagInput({
  setValue,
  setError,
  clearErrors,
  errorMessage,
}: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagsInput] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHashtagsInput(value);
  };

  const onDelete = (tag: string) => {
    setHashtags(prev => prev.filter(item => item !== tag));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      setHashtagsInput('');

      if (!hashtagInput) return;
      if (hashtags.includes(hashtagInput)) return;
      if (hashtags.length > 2) {
        return setError('tag', {
          message: '태그는 최대 3개까지 입력 가능합니다.',
        });
      }
      setHashtags(prev => [...prev, hashtagInput]);
    }
  };

  useEffect(() => {
    setValue('tag', hashtags);
    clearErrors('tag');
  }, [hashtags]);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearErrors('tag');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  const handleTagBoxClick = () => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className='flex w-full flex-col gap-3'>
      <label htmlFor='tag' className='text-B1M16 text-text-secondary'>
        태그
      </label>
      <div
        className='border-neutral-30 text-B2M14 text-text-secondary hide-scroll mb-1 h-[74px] cursor-text overflow-x-hidden overflow-y-scroll rounded-[6px] border'
        onClick={handleTagBoxClick}
      >
        <div className='flex size-full items-start px-4 py-2'>
          <ul
            className={`flex max-w-[448px] shrink-0 flex-wrap gap-2 ${hashtags.length !== 0 && 'mr-4'}`}
          >
            {hashtags.map((tag, i) => (
              <li
                key={i}
                className='text-text-secondary text-B2M14 bg-tag-tag flex max-w-[400px] items-center gap-2 rounded-full py-1 pl-3 pr-[9.5px]'
              >
                #{tag}
                <span onClick={() => onDelete(tag)}>
                  <IconCancelGray className='cursor-pointer' />
                </span>
              </li>
            ))}
            <input
              id='tag'
              type='text'
              value={hashtagInput}
              autoComplete='off'
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder='#태그 입력 (최대 3개 입력)'
              className='placeholder:text-B2R14 placeholder:text-text-gray shrink-0 outline-none'
              ref={inputRef}
            />
          </ul>
        </div>
      </div>
      {errorMessage && (
        <span className='text-B3R12 text-text-waring'>{errorMessage}</span>
      )}
    </div>
  );
}
