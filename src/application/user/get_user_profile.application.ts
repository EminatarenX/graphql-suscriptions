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
        this.axiosService.post(user.webhook, {
          event: 'get_user_profile',
          data: {
            message: `User has been viewed your profile`,
            code: '200',
            user: id
          }
        })


        success = true
      } catch (error) {
        success = false
      } finally {
        if (success) {

        } else {

        }
      }
    }


    return user
  }

}
