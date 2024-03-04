import { ILike } from '../../domain/like/ILike.interface';
import { IPost } from '../../domain/post/IPost.interface';
import { IAxios } from '../../domain/services/IAxios';
import { IJWT } from '../../domain/services/IJWT';
import { IUserRepository } from '../../domain/user/IUser.repository';
import { IWebhook } from '../../domain/webhook/IWebhook';

export class LikePost {
  constructor(
    private readonly likeRepository: ILike,
    private readonly jwtRepository: IJWT,
    private readonly axiosService: IAxios,
    private readonly postRepository: IPost,
    private readonly webhookRepository: IWebhook) { }
  async run(postId: string, token: string) {
    const { data: userId } = await this.jwtRepository.verify(token)
    const like = await this.likeRepository.likePost(postId, userId)
    const post = await this.postRepository.getPostById(postId)
    const webhook = await this.webhookRepository.findWebhookByUserId(post.userId)
    let success: boolean = false

    if (webhook && webhook.userId !== userId && webhook.events.includes('post.liked')) {

      try {
        await this.axiosService.post(webhook.url || '', {
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

      }
    }

    return like
  }
}
