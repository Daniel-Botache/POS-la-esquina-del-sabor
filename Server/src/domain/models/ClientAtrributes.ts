import { Model, Optional } from "sequelize";

export interface ClientAttributes {
  id: string;
  name: string;
  tel: string;
  address: string;
  ban: boolean;
  quotaMax: number;
  clientType: string;
  remainingQuota: number;
  lastPayment: Date;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
