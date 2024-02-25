import { GetLikesByPostId } from "../../../application/like/getLikesByPostId.application";

export class GetLikesByPostIdController {
  constructor(private readonly getLikesByPostIdUseCase: GetLikesByPostId) { }

  async run(_parent: any, args: { postId: string }) {
    const likes = await this.getLikesByPostIdUseCase.run(args.postId);
    return {
      code: 200,
      success: true,
      message: "Likes fetched successfully",
      likes,
    }
  }
}
