import { BaleInstance } from "../../domain/models/BaleAttributes";

export interface IBaleRepository {
  findByName(name: string): Promise<BaleInstance[]>;
  findByBarCode(barcode: string): Promise<BaleInstance>;
}
