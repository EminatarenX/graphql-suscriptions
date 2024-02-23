import { CreatePost } from "../../../application/post/CreatePost";
export class CreatePostController {
  constructor(private readonly createPost: CreatePost) { }
  async run(_parent: any, { content }: { content: string }, { token }: { token: string }) {
    if (!token) throw new Error("Not Authorized, token not provided")
    const jwt = token.split(" ")[1]
    const post = await this.createPost.run(content, jwt)
    return {
      code: "200",
      success: true,
      message: "Post created",
      post
    }
  }
} 
