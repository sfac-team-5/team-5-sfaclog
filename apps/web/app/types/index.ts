export interface UserType {
  avatar: FileList | string | null;
  avatarUrl: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  id: string;
  interests: string[];
  intro: string;
  nickname: string;
  phone: string;
  offers: string[];
  updated: string;
  username: string;
  verified: boolean;
  sns: SNSType[];
  career?: CareerType[];
}

export interface CareerType {
  from: string;
  to: string;
  status: boolean;
  company: string;
}

export interface SNSType {
  type: string;
  url: string;
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

export interface NotificationType {
  collectionId: string;
  collectionName: string;
  content: string;
  created: string;
  id: string;
  isRead: boolean;
  link: string;
  updated: string;
  userId: string;
}

export interface GroupedNotificationsType {
  today: NotificationType[];
  lastSevenDays: NotificationType[];
  lastThirtyDays: NotificationType[];
}

export interface FollowDataType {
  collectionId: string;
  collectionName: string;
  created: string;
  followerId?: string[];
  followingId?: string[];
  expand?: {
    followerId?: UserType[];
    followingId?: UserType[];
  };
  id: string;
  updated: string;
  userId: string;
}
