import { SaleInstance } from "../../domain/models/SaleAttributes";

export interface ISaleRepository {
  findAll(): Promise<SaleInstance[]>;
  findById(id: string): Promise<SaleInstance | null>;
  create(data: SaleInstance): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
