import { IPost } from "../../domain/post/IPost.interface";
import { IJWT } from "../../domain/services/IJWT";

export class CreatePost {
  constructor(
    private readonly postRepository: IPost,
    private readonly jwtRepository: IJWT
  ) { }

  async run(content: string, token: string) {
    const { data: userId } = await this.jwtRepository.verify(token)
    return await this.postRepository.createPost(content, userId)

  }
}
