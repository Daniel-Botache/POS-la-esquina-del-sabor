import { ProductInstance } from "../../domain/models/ProductAttributes";

export interface IProductRepository {
  findAll(): Promise<ProductInstance[]>;
  findById(id: string): Promise<ProductInstance | null>;
  create(data: any): Promise<boolean>;
  update(id: string, data: any): Promise<boolean>;
}
