import { CommentPost } from "../../application/comment/CommentPost";
import { CommentPrismaRepository } from "./comment.repository";
import { JWTService } from "../../infraestructure/services/jwt.service";
import { CommentPostController } from "./controllers/commentPost.controller";


const commentRepository = new CommentPrismaRepository();
const jwtService = new JWTService();

// Create or comment a post 
const commentPostUseCase = new CommentPost(commentRepository, jwtService);
export const commentPostController = new CommentPostController(commentPostUseCase);

