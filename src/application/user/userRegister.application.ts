import { IUserRepository } from "../../domain/user/IUser.repository";
import { User } from "../../domain/user/User";
import { IPubsubService } from "../../domain/graphql/IPubsub.repository";
import { pubSub } from "../../infraestructure/server/schema";
export class UserRegister {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly pubsubService: any
    ){} 

    async run(email: string, password: string): Promise<User>{
        pubSub.publish("NEW_USER", {email, password})
        // this.pubsubService.publish("NEW_USER", {email, password})
        return this.userRepository.register(email, password)
    }
}