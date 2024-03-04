import { ILike } from "../../domain/like/ILike.interface"
export class PageLikes {
  constructor(private readonly likeRepo: ILike) { }

  async run(postId: string, page: number) {
    return await this.likeRepo.pageLikes(postId, page)
  }
}
