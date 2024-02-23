import { User } from "./User";

export interface IUserRepository {
  register(email: string, password: string): Promise<User>;
  authentication(email: string, password: string): Promise<User>;
}
