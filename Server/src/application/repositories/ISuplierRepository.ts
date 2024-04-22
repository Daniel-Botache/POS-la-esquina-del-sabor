import { SuplierInstance } from "../../domain/models/SuplierAttributes";

export interface ISuplierRepository {
  findById(id: string): Promise<SuplierInstance | null>;
}
