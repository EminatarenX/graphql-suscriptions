import { CreatePostController } from "./controllers/create.controller";
import { CreatePost } from "../../application/post/CreatePost";
import { PostPrismaRepository } from "./post.repository";
import { JWTService } from "../services/jwt.service";
import { GetFeed } from "../../application/post/GetFeed";
import { GetFeedController } from "./controllers/getFeed.controller";
const postRepository = new PostPrismaRepository()
const jwtRepository = new JWTService()
//createpost
const createPostUseCase = new CreatePost(postRepository, jwtRepository)
export const createPostController = new CreatePostController(createPostUseCase)
// GetFeed
const getFeedUseCase = new GetFeed(postRepository, jwtRepository)
export const getFeedController = new GetFeedController(getFeedUseCase)



