import { Model, Optional } from "sequelize";

export interface SuplierAttributes {
  id: string;
  company: string;
  tel: string;
  adviser: string;
}

interface SuplierCreationAttributes
  extends Optional<SuplierAttributes, "tel"> {}

export interface ClientInstance
  extends Model<SuplierAttributes, SuplierCreationAttributes>,
    SuplierAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
