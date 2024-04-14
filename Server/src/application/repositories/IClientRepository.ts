import { ClientInstance } from "../../domain/models/ClientAtrributes";

export interface IClientRepository {
  findAll(): Promise<ClientInstance[]>;
  findById(id: number): Promise<ClientInstance | null>;
  create(id: ClientInstance): Promise<ClientInstance>;
  update(id: number, client: ClientInstance): Promise<void>;
  delete(id: number): Promise<void>;
}
