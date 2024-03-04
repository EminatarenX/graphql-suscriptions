import { DeleteWebhook } from "../../../application/webhook/DeleteWebhook";

export class DeleteWebhookController {
  constructor(private readonly deleteUseCase: DeleteWebhook) { }

  async run(_parent: any, _args: any, _context: { token: string }) {
    const token = _context.token.split(" ")[1]
    const success = await this.deleteUseCase.run(token)
    return {
      code: "200",
      success,
      message: "webhook deleted"
    }
  }
}
