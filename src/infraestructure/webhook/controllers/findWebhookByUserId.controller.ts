import { FindWebhookByUserId } from "../../../application/webhook/findByUserId.application";

export class FindWebhookByUserIdController {
  constructor(private readonly findWebhookByUserIdUseCase: FindWebhookByUserId) { }
  async run(_parent: string, _args: any, _context: { token: string }) {
    const webhook = await this.findWebhookByUserIdUseCase.run(_context.token.split(" ")[1]);
    return {
      code: "200",
      message: "webhook found",
      success: true,
      webhook
    }
  }
}
