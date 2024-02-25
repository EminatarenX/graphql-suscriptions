import { LikePost } from '../../../application/like/likePost.application'

export class LikePostController {
  constructor(private readonly likePost: LikePost) { }
  async run(_parent: any, { postId }: { postId: string }, { token }: { token: string }) {
    if (!token) throw new Error("Not Authorized, token not provided")
    const jwt = token.split(" ")[1]
    const like = await this.likePost.run(postId, jwt)

    return {
      code: "200",
      success: true,
      message: "Post liked",
      like
    }
  }
}
