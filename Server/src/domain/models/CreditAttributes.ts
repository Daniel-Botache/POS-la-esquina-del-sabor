import { Model } from "sequelize";

interface CeditAttributes {
  id: string;
  quota: number;
  type: string;
}

export interface CreditInstance
  extends Model<CeditAttributes>,
    CeditAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
