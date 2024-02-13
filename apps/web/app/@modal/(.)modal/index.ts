import { DeleteAccountType } from '@/(route)/mypage/delete-account/action';
import { signOut } from 'next-auth/react';

export const modalLogDelete = {
  title: '삭제하기',
  description: '작성하신 로그를 삭제하시겠습니까?',
  logDelete: async (id: string) => {
    const response = await fetch(`/api/log/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) return alert('삭제 실패요 ㅜㅜ');
  },
};

export const modalUserBlock = {
  title: ' 님 차단하기',
  description: ' 님은 나를 팔로우하거나 쪽지를 보낼 수 없게 됩니다.',
  userBlock: async (userId: string) => {
    // await fetch('엔드포인트');
    console.log('유저 차단하기!!!');
  },
};

export const modalLogCancel = {
  title: '취소하기',
  description: '작성을 정말 취소하시겠습니까? 작성하신 로그가 사라집니다.',
  link: '/',
};

export const modalCommentDelete = {
  title: '삭제하기',
  description: '이 댓글을 삭제하시겠습니까?',
  commentDelete: async (logId: string, commentId: string, userId: string) => {
    const response = await fetch(`/api/log/comment/${logId}`, {
      method: 'DELETE',
      body: JSON.stringify({ commentId, userId }),
    });
    if (!response.ok) return alert('삭제 실패요 ㅜㅜ');
  },
};

export const modalReplyCommentDelete = {
  title: '삭제하기',
  description: '이 댓글을 삭제하시겠습니까?',
  commentDelete: async (logId: string, commentId: string, userId: string) => {
    const response = await fetch(`/api/log/reply-comment/${logId}`, {
      method: 'DELETE',
      body: JSON.stringify({ commentId, userId }),
    });
    if (!response.ok) return alert('삭제 실패요 ㅜㅜ');
  },
};

export const modalAccountDelete = {
  title: '정말 탈퇴하시겠습니까?',
  description: '회원님의 정보가 삭제됩니다.',
  accountDelete: async (data: DeleteAccountType) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`,
      {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      alert('비밀번호를 확인해주세요!');
    } else {
      alert('회원탈퇴가 완료되었습니다.');
      await signOut();
      return;
    }
  },
};

export const modalFollowerDelete = {
  title: '이 사용자를 삭제하시겠습니까?',
  description:
    '해당 사용자는 회원님의 팔로워 리스트에서 삭제된 사실을 알 수 없습니다.',
  followerDelete: async () => {
    console.log(1);
  },
};
