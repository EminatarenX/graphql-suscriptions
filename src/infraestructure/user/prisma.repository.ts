import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../domain/user/IUser.repository";
import { User } from "../../domain/user/User";

export class PrismaUserRepository implements IUserRepository {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient()
  }
  async register(email: string, password: string, webhook: string): Promise<User> {

    const existUser = await this.db.user.findUnique({
      where: {
        email: email
      }
    })

    if (existUser) throw new Error('This user already exist')

    const user = await this.db.user.create({
      data: {
        email,
        password,
        webhook
      }
    })

    return new User(
      user.email,
      user.password,
      user.webhook
    )
  }
  async authentication(email: string, password: string): Promise<User> {
    const user = await this.db.user.findFirst({ where: { email } });
    if (!user) throw new Error("this user isn't exist");
    return new User(user.email, user.password, user.webhook);

  }
  async getUserById(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: {
        email: id,
      },
      include: {
        posts: {
          include: {
            likes: true,
            comments: true
          }
        }
      }
    })
    if (!user) throw new Error('This user is not exist')
    return new User(
      user.email,
      user.password,
      user.webhook,
      undefined,
      user.posts
    )
  }
}
