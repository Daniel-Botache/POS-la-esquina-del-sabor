import { Model, Optional } from "sequelize";

export interface ClientAttributes {
  id: number;
  name: string;
  tel: string;
  address: string;
  ban: boolean;
}

interface ClientCreationAttributes
  extends Optional<ClientAttributes, "address"> {}

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
