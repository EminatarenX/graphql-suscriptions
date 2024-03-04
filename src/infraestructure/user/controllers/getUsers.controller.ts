import { FindUsers } from "../../../application/user/findUsers";

export class FindUsersController {
  constructor(private readonly findUsersUseCase: FindUsers) { }
  async run(_parent: any, _args: { page: number }) {
    return await this.findUsersUseCase.run(_args.page)
  }
}
