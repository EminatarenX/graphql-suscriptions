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
      return await this.authUser.run(email, password);
    } catch (e) {
      const error: unknown = e
      throw error
    }
  }
}
