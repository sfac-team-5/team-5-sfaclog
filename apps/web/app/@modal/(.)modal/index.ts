// <Link href={'/modal?type=log-delete&id=${id}'} scroll={false}>삭제하기</Link>
// 로그 삭제 모달을 사용하기 위해 Link 태그의 경로에 type은 log-delete, id는 삭제 할 로그의 id를 넣어주세요
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
// <Link href={`/modal?type=user-block&id=${id}&username=${username]}`} scroll={false}>차단하기</Link>
// 유저 차단하기 모달을 사용하기 위해 Link 태그의 경로에 type은 user-block, id는 차단 할 유저의 id, username은 차단 할 유저의 username을 넣어주세요
export const modalUserBlock = {
  title: ' 님 차단하기',
  description: ' 님은 나를 팔로우하거나 쪽지를 보낼 수 없게 됩니다.',
  userBlock: async (id: string) => {
    // await fetch('엔드포인트');
    console.log('유저 차단하기!!!');
  },
};

export const modalLogCancel = {
  title: '취소하기',
  description: '작성을 정말 취소하시겠습니까? 작성하신 로그가 사라집니다.',
  link: '/',
};
