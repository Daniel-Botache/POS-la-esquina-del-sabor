import { ClientInstance } from "../../domain/models/ClientAtrributes";

export interface IClientRepository {
  findAll(): Promise<ClientInstance[]>;
  findById(cedula: number): Promise<ClientInstance | null>;
  create(client: ClientInstance): Promise<ClientInstance>;
  update(cedula: number, client: ClientInstance): Promise<void>;
  delete(cedula: number): Promise<void>;
}
