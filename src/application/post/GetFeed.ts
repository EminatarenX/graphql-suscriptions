import { IPost } from "../../domain/post/IPost.interface";
import { IJWT } from "../../domain/services/IJWT";

export class GetFeed {
  constructor(private readonly postRepository: IPost, private readonly jwtServie: IJWT) { }
  async getFeed(token: string) {
    const { data: userId } = await this.jwtServie.verify(token);
    return await this.postRepository.getFeed(userId);
  }
}
