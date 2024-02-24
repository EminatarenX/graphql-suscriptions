import { IPost } from "../../domain/post/IPost.interface";

export class GetPostById {
  constructor(
    private readonly postRepository: IPost
  ) { }
  async run(id: string) {
    return await this.postRepository.getPostById(id)
  }
}
