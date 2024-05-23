import { TypeInstance } from "../../domain/models/TypeAttributes";

export interface ITypeRepository {
  findAll(): Promise<TypeInstance[]>;
  findById(id: string): Promise<TypeInstance | null>;
}
