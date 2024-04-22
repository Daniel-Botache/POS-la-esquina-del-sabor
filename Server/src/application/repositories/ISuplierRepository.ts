import { SuplierInstance } from "../../domain/models/SuplierAttributes";

export interface ISaleRepository {
  findById(id: string): Promise<SuplierInstance | null>;
}
