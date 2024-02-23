import { User } from "../../domain/user/User";
import { IUserRepository } from "../../domain/user/IUser.repository";
import { IJWT } from "../../domain/services/IJWT";
import { IBcrypt } from "../../domain/services/IBcrypt";

export class AuthUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcrypt,
    private readonly jwtService: IJWT
  ) { }

  async run(email: string, password: string): Promise<User> {
    const user = await this.userRepository.authentication(email, password);
    const isPasswordCorrect = await this.bcryptService.compare(password, user.password)
    if (!isPasswordCorrect) throw new Error("Password is incorrect")
    const token = await this.jwtService.sign(user.email)
    return new User(user.email, user.email, token)
  }
}
