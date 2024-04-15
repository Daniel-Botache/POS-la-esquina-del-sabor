import { UserInstance } from "../../domain/models/UserAttributes";

export interface IUserRepository {
  findAll(): Promise<UserInstance[]>;
  findById(nick: string): Promise<UserInstance | null>;
  create(id: UserInstance): Promise<UserInstance>;
  update(id: number, client: UserInstance): Promise<void>;
  delete(id: number): Promise<void>;
}
