import { CommentPost } from "../../application/comment/CommentPost";
import { CommentPrismaRepository } from "./comment.repository";
import { JWTService } from "../../infraestructure/services/jwt.service";
import { CommentPostController } from "./controllers/commentPost.controller";
import { GetCommentsByPostId } from "../../application/comment/GetCommentsByPostId";
import { GetCommentsByPostIdController } from "./controllers/getCommentsById.controller";


const commentRepository = new CommentPrismaRepository();
const jwtService = new JWTService();

// Create or comment a post 
const commentPostUseCase = new CommentPost(commentRepository, jwtService);
export const commentPostController = new CommentPostController(commentPostUseCase);

// getCommentsByPostIdUseCase
const getCommentsByPostIdUseCase = new GetCommentsByPostId(commentRepository);
export const getCommentsByPostIdController = new GetCommentsByPostIdController(getCommentsByPostIdUseCase);


