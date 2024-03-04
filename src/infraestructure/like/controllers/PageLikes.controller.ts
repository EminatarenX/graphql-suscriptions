import { PageLikes } from "../../../application/like/PageLikes";

export class PageLikesController {
  constructor(private readonly pageLikesUseCase: PageLikes) { }
  async run(_parent: any, _args: { postId: string, page: number }) {
    return await this.pageLikesUseCase.run(_args.postId, _args.page)
  }
}
