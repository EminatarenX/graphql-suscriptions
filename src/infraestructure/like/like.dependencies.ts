import { LikePrismaRepository } from './like.repository'
import { LikePost } from '../../application/like/likePost.application'
import { LikePostController } from './controllers/likePost.controller'
import { JWTService } from '../services/jwt.service'
import { GetLikesByPostId } from '../../application/like/getLikesByPostId.application'
import { GetLikesByPostIdController } from './controllers/getLikesByPostId.controller'
import { PostPrismaRepository } from '../post/post.repository'
import { PrismaUserRepository } from '../user/prisma.repository'
import { AxiosService } from '../services/axios.service'
import { WebhookRepository } from '../webhook/webhook.repository'
import { PageLikes } from '../../application/like/PageLikes'
import { PageLikesController } from './controllers/PageLikes.controller'
const likeRepository = new LikePrismaRepository()
const jwtRepository = new JWTService()
const postRepository = new PostPrismaRepository()
const axiosService = new AxiosService()
const webhookRepository = new WebhookRepository()
const likePostUseCase = new LikePost(likeRepository, jwtRepository, axiosService, postRepository, webhookRepository)
export const likePostController = new LikePostController(likePostUseCase)
// GetLikes by post id
const getLikesByPostIdUseCase = new GetLikesByPostId(likeRepository)
export const getLikesByPostIdController = new GetLikesByPostIdController(getLikesByPostIdUseCase)

const pageLikesUseCase = new PageLikes(likeRepository)
export const pageLikesController = new PageLikesController(pageLikesUseCase)
