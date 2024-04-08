import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { ClientInstance } from "../../domain/models/ClientAtrributes";
import { Client } from "../config/database";

export class ClienteRepository implements IClientRepository {
  public async findAll(): Promise<ClientInstance[]> {
    const clientes = await Client.findAll();
    return clientes.map((c) => c.toJSON() as ClientInstance);
  }

  public async findById(cedula: number): Promise<ClientInstance | null> {
    const cliente = await Client.findByPk(cedula);
    return cliente ? (cliente.toJSON() as ClientInstance) : null;
  }

  public async create(client: ClientInstance): Promise<ClientInstance> {
    // Crear un objeto que coincida con las columnas de la tabla Client
    const { id, cedula, name, tel, address, ban, dateIn } = client;
    const createdCliente = await Client.create({
      id,
      cedula,
      name,
      tel,
      address,
      ban,
      dateIn,
    });
    return createdCliente.toJSON() as ClientInstance;
  }

  public async update(cedula: number, client: ClientInstance): Promise<void> {
    await Client.update(client, { where: { cedula } });
  }

  public async delete(cedula: number): Promise<void> {
    await Client.destroy({ where: { cedula } });
  }
}
