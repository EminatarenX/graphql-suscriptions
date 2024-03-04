import { IWebhook } from "../../domain/webhook/IWebhook";
import { IJWT } from "../../domain/services/IJWT"

export class DeleteWebhook {
  constructor(private readonly webhookRepo: IWebhook, private readonly jwtService: IJWT) { }

  async run(token: string) {
    const { data: userId } = await this.jwtService.verify(token)
    return await this.webhookRepo.deleteWebhooks(userId)
  }
}
