import { User } from "./User";

export interface IUserRepository {
  register(email: string, password: string): Promise<User>;
  authentication(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  findUsers(page: number): Promise<User[]>;
}
