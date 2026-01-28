export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  user?: User;
  mediaUrl: string;
  mediaType: 'photo' | 'video';
  caption?: string;
  createdAt: Date;
  commentsCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: Date;
}

export interface CreateCommentDto {
  postId: string;
  content: string;
}
