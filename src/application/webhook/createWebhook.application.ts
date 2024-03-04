import { IJWT } from "../../domain/services/IJWT";
import { IWebhook } from "../../domain/webhook/IWebhook";

export class CreateWebhook {
  constructor(
    private readonly webhookRepository: IWebhook,
    private readonly jwtRepository: IJWT
  ) { }
  async run(events: string[], url: string, token: string) {
    const { data: userId } = await this.jwtRepository.verify(token)
    return await this.webhookRepository.create(events, url, userId)

  }
}
