import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../domain/user/IUser.repository";
import { User } from "../../domain/user/User";

export class PrismaUserRepository implements IUserRepository {
    private db: PrismaClient;
    constructor(){
        this.db = new PrismaClient()
    }
    async register(email: string, password: string): Promise<User> {

        const existUser = await this.db.user.findUnique({where: {
            email: email
        }})

        if(existUser) throw new Error('This user already exist')

        const user = await this.db.user.create({
            data: {
                email,
                password
            }
        })

        return new User(
            user.email,
            user.password
        )
    }
}