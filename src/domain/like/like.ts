export class Like {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly postId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) { }
} 
