import axios from "axios";

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

export async function searchProduct(name: string, route: string) {
  const convertedName = Number(name);
  if (!isNaN(convertedName)) {
    try {
      const data = await axios.get(`/${route}/search/${convertedName}`);
      const productArray = [];
      productArray.push(data.data.success);
      return productArray;
    } catch (error: any) {
      return false;
    }
  }
  try {
    const data: request = await axios.get(`/${route}/search?name=${name}`);
    console.log(data);
    return data.data.success;
  } catch (error: any) {
    return false;
  }
}
