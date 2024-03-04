import { IWebhook } from "../../domain/webhook/IWebhook";
import { IJWT } from "../../domain/services/IJWT";
export class FindWebhookByUserId {
  constructor(
    private readonly webhookRepository: IWebhook,
    private readonly jwtrepository: IJWT
  ) { }

  async run(token: string) {
    const { data: userId } = await this.jwtrepository.verify(token);
    const webhook = await this.webhookRepository.findWebhookByUserId(userId);
    return webhook;
  }
}
