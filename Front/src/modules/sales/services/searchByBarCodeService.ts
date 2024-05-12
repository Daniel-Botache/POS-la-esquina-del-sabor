import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export interface productResponse {
  data: {
    success: [
      {
        id: string;
        name: string;
        type: string;
        volume: number;
        maximum: number;
        barcode: string;
        price: number;
        spent: boolean;
        createdAt: Date;
        updatedAt: Date;
        suppliers: [
          id: string,
          company: string,
          tel: string,
          adviser: string,
          createdAt: Date,
          updatedAt: Date
        ];
      }
    ];
  };
}

export async function searchByBarCode(barCode: string) {
  try {
    const data = await axios.get(`/product/search/${barCode}`);
    return data.data.success;
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return false;
  }
}
