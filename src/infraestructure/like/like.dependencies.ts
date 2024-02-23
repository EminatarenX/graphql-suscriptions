import { LikePrismaRepository } from './like.repository'
import { LikePost } from '../../application/like/likePost.application'
import { LikePostController } from './controllers/likePost.controller'
import { JWTService } from '../services/jwt.service'
const likeRepository = new LikePrismaRepository()
const jwtRepository = new JWTService()

const likePostUseCase = new LikePost(likeRepository, jwtRepository)
export const likePostController = new LikePostController(likePostUseCase)

