import { PrismaClient } from '@prisma/client';
import { IPost } from '../../domain/post/IPost.interface';
import { Post } from '../../domain/post/post';

export class PostPrismaRepository implements IPost {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient()

  }

  async createPost(body: string, userId: string) {
    const post = await this.db.post.create({
      data: {
        body,
        userId
      }
    })
    return new Post(
      post.id,
      post.body,
      post.userId,
      post.createdAt,
      post.updatedAt,
    )
  }

  async getFeed(userId: string): Promise<Post[]> {
    const posts = await this.db.post.findMany({
      where: {
        NOT: {
          userId: {
            equals: userId
          }
        }
      },
      include: {
        likes: true,
        comments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return posts.map(post => new Post(
      post.id,
      post.body,
      post.userId,
      post.createdAt,
      post.updatedAt,
      post.likes,
      post.comments
    ))
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.db.post.findUnique({
      where: {
        id
      },
      include: {
        likes: true,
        comments: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return new Post(
      post.id,
      post.body,
      post.userId,
      post.createdAt,
      post.updatedAt,
      post.likes,
      post.comments
    )
  }

} 
