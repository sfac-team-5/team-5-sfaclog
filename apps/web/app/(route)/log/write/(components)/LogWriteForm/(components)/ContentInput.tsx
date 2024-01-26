'use client';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import { UseFormSetValue } from 'react-hook-form';
import { LogFormData } from '../LogWriteForm';
import { preconnect } from 'react-dom';
Quill.register('modules/ImageResize', ImageResize);

interface ContentInputProps {
  setValue: UseFormSetValue<LogFormData>;
  prevContent?: string;
}

export default function ContentInput({
  setValue,
  prevContent,
}: ContentInputProps) {
  const quillRef = useRef<any>();
  const [content, setContent] = useState(prevContent ? prevContent : '');

  const onChange = (newContent: string) => {
    setContent(newContent);
  };

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

  useEffect(() => {
    setValue('content', content);
  }, [content]);

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      theme={'snow'}
      onChange={onChange}
    />
  );
}
