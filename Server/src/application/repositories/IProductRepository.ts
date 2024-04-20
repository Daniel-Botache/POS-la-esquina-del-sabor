import { ProductInstance } from "../../domain/models/ProductAttributes";

export interface IProductRepository {
  findAll(): Promise<ProductInstance[]>;
  findById(id: string): Promise<ProductInstance | null>;
  create(data: ProductInstance): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  update(id: string, data: ProductInstance): Promise<boolean>;
}
