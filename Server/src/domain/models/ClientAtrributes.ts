import { Model, Optional } from "sequelize";

export interface ClientAttributes {
  id: string;
  name: string;
  tel: string;
  address: string;
  dateIn: string;
  ban: boolean;
  cedula: number;
}

interface ClientCreationAttributes
  extends Optional<ClientAttributes, "address"> {}

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
