import { IJWT } from "../../domain/services/IJWT";
import { IUserRepository } from "../../domain/user/IUser.repository";
import { IAxios } from "../../domain/services/IAxios";
export class GetUserProfile {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJWT,
    private readonly axiosService: IAxios
  ) { }

  async run(userId: string, token: string) {
    if (!token) throw new Error('Token is required, please login')
    const { data: id } = await this.jwtService.verify(token)
    const user = await this.userRepository.getUserById(userId)
    let success: any = null
    if (id !== userId) {
      try {
        await this.axiosService.post(user.webhook, {
          event: 'profile.view',
          data: {
            message: `User has been viewed your profile`,
            code: '200',
            user: id,
            date: new Date()
          }
        })


        success = true
        console.log('webhook success')
      } catch (e) {
        const error = e as Error
        console.log('error handling webhook', error.message)
        success = false
      } finally {
        // Notify another API about the user profile viewed
        console.log('Notify another API about the user profile viewed, status: ', success)
        if (success) { } else { }
      }
    }


    return user
  }

}
