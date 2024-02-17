
import { UserRegister } from "../../../application/user/userRegister.application";
interface newUserInput {
    email: string,
    password: string
}

export class UserRegisterController {
    constructor(
        private readonly registerUser: UserRegister,
    ){}
    async run(_parent: any, {email, password}: newUserInput, context: any){
        try {
            return await this.registerUser.run(email, password)
        } catch (e) {
            const error: unknown  = e
            throw error
        }
    }
}