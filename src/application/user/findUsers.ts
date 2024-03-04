import { PrismaUserRepository } from "../../infraestructure/user/prisma.repository";

export class FindUsers {
  constructor(private readonly userRepository: PrismaUserRepository) { }
  async run(page: number) {
    return await this.userRepository.findUsers(page)
  }
}
