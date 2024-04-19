import { ProductInstance } from "../../domain/models/ProductAttributes";

export interface IProductRepository {
  findById(id: string): Promise<ProductInstance | null>;
  create(data: ProductInstance): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
