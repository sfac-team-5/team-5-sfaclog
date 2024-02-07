import { InputBox } from '@repo/ui/InputBox';
// import { FieldErrors, UseFormSetValue } from 'react-hook-form';
// import { LogFormData } from '../LogWriteForm';
// import { CommunityFormData } from '@/(route)/community/write/(components)/CommunityWriteForm';

interface TitleInputProps {
  label: string;
  setValue: any;
  errors: any;
}

function TitleInput({ label, setValue, errors }: TitleInputProps) {
  const handleTitleChange = (title: string) => {
    setValue('title', title);
  };
  return (
    <div className='flex w-full flex-col gap-3'>
      <label htmlFor={label} className='text-B1M16 text-text-secondary'>
        {label}
      </label>
      <InputBox
        placeholder='제목을 입력해주세요.'
        id={label}
        errorMessage={errors.title?.message}
        onValueChange={handleTitleChange}
      />
    </div>
  );
}

export default TitleInput;
