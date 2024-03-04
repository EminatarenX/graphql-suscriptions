import { IJWT } from "../../domain/services/IJWT";
import { IUserRepository } from "../../domain/user/IUser.repository";
import { IAxios } from "../../domain/services/IAxios";
import { IWebhook } from "../../domain/webhook/IWebhook";
export class GetUserProfile {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJWT,
    private readonly axiosService: IAxios,
    private readonly webhookRepository: IWebhook
  ) { }

  async run(userId: string, token: string) {
    if (!token) throw new Error('Token is required, please login')

    const { data: id } = await this.jwtService.verify(token)
    const user = await this.userRepository.getUserById(userId)
    let success: any = null
    if (id !== userId) {
      try {
        const webhook = await this.webhookRepository.findWebhookByUserId(userId)
        if (!webhook) {
          success = false

        }
        else if (webhook && webhook.events.includes("profile.viewed")) {

          await this.axiosService.post(webhook.url || "", {
            event: "profile.viewed",
            data: {
              message: `User has been viewed your profile`,
              code: '200',
              user: id,
              date: new Date()
            }
          })


          success = true
          console.log('webhook success')
        }
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
