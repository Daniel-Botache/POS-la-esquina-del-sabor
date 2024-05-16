import { BaleInstance } from "../../domain/models/BaleAttributes";

export interface IBaleRepository {
  findByBarCode(barcode: string): Promise<BaleInstance>;
}
