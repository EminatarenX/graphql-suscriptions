import { IComment } from "../../domain/comment/comment.interface";

export class DeleteComment {
  constructor(private readonly commentRepo: IComment) { }

  async run(id: string) {
    return await this.commentRepo.deleteComment(id)
  }
}

