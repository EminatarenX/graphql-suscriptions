import { Like } from '../like/like';
import { Comment } from "../comment/comment";

export class Post {
  constructor(
    public readonly id: string,
    public readonly body: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly likes?: Like[],
    public readonly comments?: Comment[],
  ) { }
}
