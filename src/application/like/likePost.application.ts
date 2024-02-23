import { ILike } from '../../domain/like/ILike.interface';
import { IJWT } from '../../domain/services/IJWT';

export class LikePost {
  constructor(private readonly likeRepository: ILike, private readonly jwtRepository: IJWT) { }
  async run(postId: string, token: string) {
    const { data: userId } = await this.jwtRepository.verify(token)
    return await this.likeRepository.likePost(postId, userId)
  }
}
