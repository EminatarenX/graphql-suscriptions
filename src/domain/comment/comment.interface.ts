import { Comment } from "./comment";
export interface IComment {
  commentPost(body: string, postId: string, userId: string): Promise<Comment>;

}
