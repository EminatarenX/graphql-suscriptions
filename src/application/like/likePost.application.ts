import { ILike } from '../../domain/like/ILike.interface';
import { IPost } from '../../domain/post/IPost.interface';
import { IAxios } from '../../domain/services/IAxios';
import { IJWT } from '../../domain/services/IJWT';
import { IUserRepository } from '../../domain/user/IUser.repository';

export class LikePost {
  constructor(
    private readonly likeRepository: ILike,
    private readonly jwtRepository: IJWT,
    private readonly axiosService: IAxios,
    private readonly postRepository: IPost,
    private readonly userRepository: IUserRepository) { }
  async run(postId: string, token: string) {
    const { data: userId } = await this.jwtRepository.verify(token)
    const like = await this.likeRepository.likePost(postId, userId)
    const post = await this.postRepository.getPostById(postId)
    const user = await this.userRepository.getUserById(post.userId)
    let success: boolean = false
    try {
      await this.axiosService.post(user.webhook, {
        event: 'post.liked',
        data: {
          message: 'Your post was liked',
          code: 200,
          post: post,
          like: like.userId,
          date: new Date()
        }

      })

      success = true
    } catch (error) {
      success = false
    } finally {
      console.log('webhook sent')
    }

    return like
  }
}
