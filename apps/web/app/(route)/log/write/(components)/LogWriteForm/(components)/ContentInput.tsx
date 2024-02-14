'use client';
import React, { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import PocketBase from 'pocketbase';
// import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
// import { LogFormData } from '../LogWriteForm';
// import { CommunityFormData } from '@/(route)/community/write/(components)/CommunityWriteForm';

Quill.register('modules/ImageResize', ImageResize);

interface ContentInputProps {
  setValue: any;
  getValues: any;
}

export default function ContentInput({
  setValue,
  getValues,
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

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (!input.files) return;
      const file = input.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);

      try {
        const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);
        const response = await pb.collection('storage').create(formData);
        const imgUrl = pb.files.getUrl(response, response.image);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', imgUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
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
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      modules={modules}
      value={content}
      theme={'snow'}
      onChange={onChange}
      className='h-[400px]'
    />
  );
}
