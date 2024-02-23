import { IComment } from "../../domain/comment/comment.interface";
import { IJWT } from '../../domain/services/IJWT';

export class CommentPost {
  constructor(private readonly commentUseCase: IComment, private readonly jwtService: IJWT) { }
  async run(body: string, postId: string, token: string) {
    const { data: userId } = await this.jwtService.verify(token);
    return await this.commentUseCase.commentPost(body, postId, userId);
  }
}
