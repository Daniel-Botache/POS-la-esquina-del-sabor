import axios from "axios";
import { errorMessage } from "../../auth/hooks/notifications";

export interface request {
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

export async function searchProductByName(name: string) {
  const convertedName = Number(name);
  if (!isNaN(convertedName)) {
    try {
      const data = await axios.get(`/product/search/${convertedName}`);
      return data.data.success;
    } catch (error: any) {
      errorMessage(error.response.data.message);
      return error;
    }
  }
  try {
    const data: request = await axios.get(`/product/search?name=${name}`);
    console.log(data);
    return data.data.success;
  } catch (error: any) {
    errorMessage(error.response.data.message);
    return error;
  }
}
