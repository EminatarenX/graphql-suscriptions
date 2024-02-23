import { Post } from "./post";
export interface IPost {
  createPost(content: string, userId: string): Promise<Post>;
  //getPostById(id: string, userId: string): Promise<Post>;
  // deletePost(id: string, userId: string): Promise<void>;
  getFeed(userId: string): Promise<Post[]>;
}
