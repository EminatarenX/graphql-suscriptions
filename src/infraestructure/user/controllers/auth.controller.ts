import e from "express";
import { AuthUser } from "../../../application/user/auth.application";
interface IAuth {
  email: string,
  password: string,

}
export class AuthUserController {
  constructor(private readonly authUser: AuthUser) { }
  async run(_parent: any, { email, password }: IAuth) {
    try {
      const user = await this.authUser.run(email, password);
      return {
        code: '200',
        success: true,
        message: 'User authenticated',
        user
      }
    } catch (e) {
      const error: unknown = e
      throw error
    }
  }
}
