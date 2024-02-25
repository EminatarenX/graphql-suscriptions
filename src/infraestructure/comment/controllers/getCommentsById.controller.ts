import { GetCommentsByPostId } from "../../../application/comment/GetCommentsByPostId";

export class GetCommentsByPostIdController {
  constructor(private readonly getCommentsByPostIdUseCase: GetCommentsByPostId) { }

  async run(_parent: any, args: { postId: string }) {
    const comments = await this.getCommentsByPostIdUseCase.run(args.postId);
    return {
      code: 200,
      success: true,
      message: "Comments fetched successfully",
      comments,
    }
  }
} 
