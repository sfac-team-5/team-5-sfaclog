import { IconPlusBlack } from '@repo/ui/Icon';

interface InputAddButtonProps {
  onClick?: () => void;
}

function InputAddButton({ onClick }: InputAddButtonProps) {
  return (
    <button
      type='button'
      className='border-neutral-30 text-B5R10 text-neutral-70 flex w-[68px] items-center justify-center gap-[2px] rounded-md border px-2 py-1.5'
      onClick={onClick}
    >
      추가하기 <IconPlusBlack width='12' />
    </button>
  );
}

export default InputAddButton;
