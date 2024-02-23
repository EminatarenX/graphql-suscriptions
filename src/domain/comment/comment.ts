export class Comment {
  constructor(
    public readonly id: string,
    public readonly body: string,
    public readonly userId: string,
    public readonly postId: string,
    public readonly createdAt: Date,
  ) { }

}
