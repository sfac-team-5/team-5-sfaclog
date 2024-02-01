export interface UserType {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  emailVisibility: boolean;
  id: string;
  interest: any[]; // 'interest' 배열의 구체적인 타입을 명시할 필요가 있음
  intro: string;
  isTerms: boolean;
  nickname: string;
  phone: string;
  proposal: any[]; // 'proposal' 배열의 구체적인 타입을 명시할 필요가 있음
  sEmail: string;
  sGithub: string;
  sInstagram: string;
  sRocketpunch: string;
  sSfacfolio: string;
  sYoutube: string;
  updated: string;
  username: string;
  verified: boolean;
}

interface SeriesType {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  title: string;
  updated: string;
  userid: string;
}

export interface LogType {
  collectionId: string;
  collectionName: string;
  content: string;
  created: string;
  expand: {
    user: UserType;
    series: SeriesType;
  };
  id: string;
  isDelete: boolean;
  isVisibility: boolean;
  likes: number;
  series: SeriesType;
  tags: string[]; // 태그의 구체적인 타입이 필요하면 수정할 수 있음
  thumbnail: string;
  title: string;
  updated: string;
  user: string;
  views: number;
  thumbnailUrl: string;
}

export interface CommunityType {
  // 추후 수정 필요
  author: string;
  category: string;
  collectionId: string;
  collectionName: string;
  comments: number;
  content: string;
  created: string;
  expand: {
    author: UserType;
  };
  id: string;
  likes: number;
  title: string;
  updated: string;
  views: number;
}

export type WidgetType = '알림' | '메시지';
export type MessageType = 'incoming' | 'outgoing';
