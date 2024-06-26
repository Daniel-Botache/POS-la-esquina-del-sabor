import { TypeInstance } from "../../domain/models/TypeAttributes";

export interface ITypeRepository {
  findById(id: string): Promise<TypeInstance | null>;
}
