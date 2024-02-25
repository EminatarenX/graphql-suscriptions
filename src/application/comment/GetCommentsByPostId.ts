import { IComment } from "../../domain/comment/comment.interface";

export class GetCommentsByPostId {
  constructor(
    private readonly commentRepository: IComment
  ) { }

  async run(postId: string) {
    return await this.commentRepository.getCommentsByPostId(postId);
  }
}
