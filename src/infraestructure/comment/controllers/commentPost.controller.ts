import { CommentPost } from "../../../application/comment/CommentPost";

export class CommentPostController {
  constructor(private readonly commentPost: CommentPost) { }
  async run(_parent: any, args: { body: string, postId: string }, context: { token: string }) {
    if (!context.token) throw new Error('Unauthorized');
    const jwt = context.token.split(' ')[1];
    const comment = await this.commentPost.run(args.body, args.postId, jwt);

    return {
      code: "200",
      success: true,
      message: "Comment created successfully",
      comment
    }
  }
}
