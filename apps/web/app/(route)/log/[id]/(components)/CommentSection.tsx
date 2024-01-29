import React from 'react';

interface CommentSectionProps {
  logId: string;
}

const fetchData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${id}`,
  );
  if (!response.ok) return null;
  return response.json();
};

async function CommentSection({ logId }: CommentSectionProps) {
  const comments = await fetchData(logId);

  return <div>CommentSection</div>;
}

export default CommentSection;
