import { BaleInstance } from "../../domain/models/BaleAttributes";

export interface IBaleRepository {
  findById(id: string): Promise<BaleInstance | null>;
  create(data: BaleInstance): Promise<boolean>;
}
