import { Post } from "../post/post";
export class User {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly webhook: string,
    public readonly token?: string,
    public readonly posts?: Post[]
  ) { }
}
