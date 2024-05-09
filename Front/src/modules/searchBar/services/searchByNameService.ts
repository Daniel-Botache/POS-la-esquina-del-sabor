import axios from "axios";
import { request } from "http";

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
      const data = await axios.get(`/product/${convertedName}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const data: request = await axios.get(`/product/search?name=${name}`);
    console.log(data);
    return data.data.success;
  } catch (error) {
    return error;
  }
}
