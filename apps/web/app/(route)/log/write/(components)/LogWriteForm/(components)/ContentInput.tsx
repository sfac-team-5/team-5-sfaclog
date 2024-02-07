'use client';
import React, { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { ImageResize } from 'quill-image-resize-module-ts';
// import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
// import { LogFormData } from '../LogWriteForm';
// import { CommunityFormData } from '@/(route)/community/write/(components)/CommunityWriteForm';

Quill.register('modules/ImageResize', ImageResize);

interface ContentInputProps {
  setValue: any;
  getValues: any;
  prevContent?: string;
}

export default function ContentInput({
  setValue,
  getValues,
  prevContent,
}: ContentInputProps) {
  const content = getValues('content');
  const quillRef = useRef<any>();

  const onChange = (newContent: string) => {
    setValue('content', newContent);
  };
  // const [content, setContent] = useState(prevContent ? prevContent : '');

  // const onChange = (newContent: string) => {
  //   setContent(newContent);
  // };

  // useEffect(() => {
  //   setValue('content', content);
  // }, [content]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image', 'link', 'code-block'],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      theme={'snow'}
      onChange={onChange}
      className='h-[400px]'
    />
  );
}
