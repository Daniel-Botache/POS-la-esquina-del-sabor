import { BaseInstance } from "../../domain/models/BaseAttributes";

export interface IBaseRepository {
  findByDate(since: string, until: string): Promise<BaseInstance[]>;
  findByDateNow(): Promise<BaseInstance[]>;
}
