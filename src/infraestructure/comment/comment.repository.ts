import { PrismaClient } from "@prisma/client";
import { Comment } from "../../domain/comment/comment";
import { IComment } from "../../domain/comment/comment.interface";

export class CommentPrismaRepository implements IComment {
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

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    const comments = await this.db.comment.findMany({
      where: {
        postId
      },
    })

    return comments.map(comment => new Comment(
      comment.id,
      comment.body,
      comment.userId,
      comment.postId,
      comment.createdAt,
    ))
  }
  async deleteComment(id: string): Promise<boolean | null> {
    try {

      const exist = await this.db.comment.findUnique({
        where: {
          id
        }
      })

      if (!exist) throw new Error('This comment does not exist')

      await this.db.comment.delete({
        where: { id: exist.id }
      })

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
