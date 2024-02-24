
import { UserRegister } from "../../../application/user/userRegister.application";
interface newUserInput {
  email: string,
  password: string,
  webhook: string
}

export class UserRegisterController {
  constructor(
    private readonly registerUser: UserRegister,
  ) { }
  async run(_parent: any, { email, password, webhook }: newUserInput, context: any) {
    try {
      const user = await this.registerUser.run(email, password, webhook)
      return {
        code: '200',
        success: true,
        message: 'User registered',
        user
      }
    } catch (e) {
      const error: unknown = e
      throw error
    }
  }
}
