import axios from "axios";
import { Supplier } from "../../suppliers/redux/supplierSlice";

export async function putSupplier(id: string, suplier: Partial<Supplier>) {
  try {
    const upDatedClient = await axios.put(`/suplier/${id}`, suplier);
    return upDatedClient;
  } catch (error) {
    return {
      succes: false,
      message: "Problema con el servidor",
    };
  }
}
