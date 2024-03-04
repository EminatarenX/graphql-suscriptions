import { CreateWebhook } from "../../../application/webhook/createWebhook.application";

export class CreateWebhookController {
  constructor(
    private readonly createUseCase: CreateWebhook
  ) { }

  async run(_parent: any, args: { events: string[], url: string }, _context: { token: string }) {
    const webhook = await this.createUseCase.run(args.events, args.url, _context.token.split(" ")[1])

    return {
      code: "200",
      success: true,
      message: "Webhook created",
      webhook
    }
  }

}
