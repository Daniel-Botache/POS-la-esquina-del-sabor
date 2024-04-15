import { UserInstance } from "../../domain/models/UserAttributes";
import { User } from "../config/database";
import { IUserRepository } from "../../application/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<UserInstance[]> {
    const users = await User.findAll();
    return users.map((user) => user as UserInstance);
  }
  public async login(user: string): Promise<UserInstance | null> {
    const userData = await User.findOne({ where: { user } });
    return userData as UserInstance;
  }
  public async findById(id: string): Promise<UserInstance | null> {
    const userData = await User.findByPk(id);
    return userData as UserInstance;
  }
  public async create(data: UserInstance): Promise<boolean> {
    const [_res, created] = await User.findOrCreate({
      where: { user: data.user },
      defaults: { user: data.user, password: data.password, admin: data.admin },
    });
    return !created;
  }
  public async delete(id: number): Promise<boolean> {
    const data = await User.destroy({ where: { id } });
    return !data;
  }
  public async update(id: string, data: UserInstance): Promise<boolean> {
    const cell = await this.findById(id);
    if (cell) {
      cell.update(data);
      return true;
    }
    return false;
  }
}
