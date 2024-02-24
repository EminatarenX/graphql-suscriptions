import { GetPostById } from "../../../application/post/getPostById";

export class GetPostByIdController {
  constructor(private readonly getPostByIdUseCase: GetPostById) { }
  async run(_parent: any, args: { id: string }) {
    const post = await this.getPostByIdUseCase.run(args.id)
    return {
      code: '200',
      success: true,
      message: 'Post found',
      post
    }
  }
}
