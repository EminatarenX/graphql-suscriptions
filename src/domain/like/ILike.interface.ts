import { Like } from './like'
export interface ILike {
  likePost(postId: string, userId: string): Promise<Like>;
  getLikesByPostId(postId: string): Promise<Like[]>;
  pageLikes(postId: string, page: number): Promise<Like[]>;
} 
