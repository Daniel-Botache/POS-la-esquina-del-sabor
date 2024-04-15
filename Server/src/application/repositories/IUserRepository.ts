import { UserInstance } from "../../domain/models/UserAttributes";

export interface IUserRepository {
  findAll(): Promise<UserInstance[]>;
  findById(id: string): Promise<UserInstance | null>;
  login(user: string): Promise<UserInstance | null>;
  create(data: UserInstance): Promise<boolean>;
  update(id: string, data: UserInstance): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
