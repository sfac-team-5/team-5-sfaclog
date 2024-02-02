interface MessageDialog {
  isDialogOpen: boolean;
}

export function MessageDialog({ isDialogOpen }: MessageDialog) {
  return (
    <div className=''>
      {isDialogOpen && (
        <div className='shadow-custom absolute ml-2.5 flex w-[88px] flex-col rounded-md bg-white px-1.5 py-2'>
          <button className='text-B2R14 text-neutral-70 items-center self-stretch p-3'>
            대화 삭제
          </button>
          <button className='text-B2R14 text-neutral-70 items-center self-stretch p-3 text-center'>
            차단하기
          </button>
        </div>
      )}
    </div>
  );
}
