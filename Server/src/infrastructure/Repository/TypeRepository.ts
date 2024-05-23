import { ITypeRepository } from "../../application/repositories/ITypeRepository";
import { TypeInstance } from "../../domain/models/TypeAttributes";
import { Type, Product } from "../config/database";

export class TypeRepository implements ITypeRepository {
  public async findById(id: string): Promise<TypeInstance | null> {
    const data = await Type.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    return data as TypeInstance;
  }
}
