import { GetFeed } from "../../../application/post/GetFeed";

export class GetFeedController {
  constructor(private readonly getFeedUseCase: GetFeed) { }
  async run(_parent: any, _args: any, context: { token: string }) {
    const jwt = context.token.split(" ")[1];

    const feed = await this.getFeedUseCase.getFeed(jwt);
    return {
      code: "200",
      success: true,
      message: "Feed",
      feed: feed.map(post => {
        return {
          post: {
            id: post.id,
            body: post.body,
            userId: post.userId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,

          },
          likes: post.likes,
          comments: post.comments
        }

      })
    }



  }
}
