import { DeleteComment } from "../../../application/comment/DeleteComment";

export class DeleteCommentController {
  constructor(private readonly deleteUseCase: DeleteComment) { }

  async run(_parent: any, _args: { id: string }) {
    const success = await this.deleteUseCase.run(_args.id)
    if (success) {
      return {
        code: "200",
        success,
        message: "Comment Deleted"
      }
    } else {
      return {
        code: "400",
        success,
        message: "Comment not deleted"
      }
    }
  }
}
