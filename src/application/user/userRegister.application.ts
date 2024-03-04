import { IUserRepository } from "../../domain/user/IUser.repository";
import { User } from "../../domain/user/User";
import { IPubsubService } from "../../domain/graphql/IPubsub.repository";
import { pubSub } from "../../infraestructure/server/schema";
import { IBcrypt } from "../../domain/services/IBcrypt";
export class UserRegister {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly pubsubService: any,
    private readonly bcryptService: IBcrypt
  ) { }

  async run(email: string, password: string): Promise<User> {
    pubSub.publish("NEW_USER", { email, password })
    // this.pubsubService.publish("NEW_USER", {email, password})
    const hashedPassword = await this.bcryptService.hash(password)
    return this.userRepository.register(email, hashedPassword)
  }
}
