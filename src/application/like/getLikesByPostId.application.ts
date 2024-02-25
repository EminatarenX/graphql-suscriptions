import { ILike } from "../../domain/like/ILike.interface";

export class GetLikesByPostId {
  constructor(
    private readonly likeRepository: ILike
  ) { }
  async run(postId: string) {
    return await this.likeRepository.getLikesByPostId(postId);
  }
}
