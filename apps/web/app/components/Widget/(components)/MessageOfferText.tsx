interface MessageOfferText {
  label: string;
  contents: string;
}

export function MessageOfferText({ label, contents }: MessageOfferText) {
  const formattedContents = contents.replace(/\n/g, '<br />');

  return (
    <div className='p-2'>
      <p className='text-B3B12 text-neutral-90'>{label}</p>
      <span
        className='text-B3R12 text-neutral-70 leading-[18px]'
        dangerouslySetInnerHTML={{ __html: formattedContents }}
      />
    </div>
  );
}
