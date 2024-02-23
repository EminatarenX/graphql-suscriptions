import { ILike } from '../../domain/like/ILike.interface';
import { PrismaClient } from '@prisma/client';
import { Like } from "../../domain/like/like";

export class LikePrismaRepository implements ILike {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient()
  }

  async likePost(postId: string, userId: string) {
    const exist = await this.db.like.findFirst({
      where: {
        postId,
        userId
      }

    })

    if (exist) {
      throw new Error('You already liked this post')
    }
    const like = await this.db.like.create({
      data: {
        postId,
        userId
      }
    })

    return new Like(
      like.id,
      like.userId,

      like.postId,
      like.createdAt,
      like.updatedAt
    )
  }
}
