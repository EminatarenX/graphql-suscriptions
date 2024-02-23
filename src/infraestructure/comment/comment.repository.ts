import { PrismaClient } from "@prisma/client";
import { Comment } from "../../domain/comment/comment";

export class CommentPrismaRepository {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();

  }

  async commentPost(body: string, postId: string, userId: string): Promise<Comment> {
    const comment = await this.db.comment.create({
      data: {
        body,
        postId,
        userId
      }
    })

    return new Comment(
      comment.id,
      comment.body,
      comment.userId,
      comment.postId,
      comment.createdAt
    );

  }
}
