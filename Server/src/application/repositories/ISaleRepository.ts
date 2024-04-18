import { SaleInstance } from "../../domain/models/SaleAttributes";

export interface ISaleRepository {
  findById(id: string): Promise<SaleInstance | null>;
  create(data: SaleInstance): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
