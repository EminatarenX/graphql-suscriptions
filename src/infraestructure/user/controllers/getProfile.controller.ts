import { GetUserProfile } from "../../../application/user/get_user_profile.application";

export class GetUserProfileController {
  constructor(private readonly getUserProfileUseCase: GetUserProfile) { }
  async run(_parent: any, args: { userId: string }, context: { token: string }) {
    const jwt = context.token.split(" ")[1]
    const user = await this.getUserProfileUseCase.run(args.userId, jwt)
    return {
      code: '200',
      success: true,
      message: 'User profile has been retrieved',
      user
    }
  }
}
