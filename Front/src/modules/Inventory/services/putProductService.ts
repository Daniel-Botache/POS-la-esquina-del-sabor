import axios from "axios";
import { errorMessage, succesMessage } from "../../auth/hooks/notifications";

interface Product {
  id: string | null;
  img: string | undefined;
  name: string;
  typeId: string | null;
  volume: number | null;
  maximum: number | null;
  barCode: string;
  price: number | null;
  spent: boolean;
  bale: boolean | null;
  productId: number | null;
  individualQuanty: number | null;
  supliers: string[] | null;
  lastVolumeDate: string | null;
}

const putProductStockService = async (product: Product, route: string) => {
  if (route == "bale") {
    try {
      const request = await axios.put(`/bale/${product.id}`, {
        name: product.name,
        volume: product.volume,
        maximum: product.maximum,
        barCode: product.barCode,
        price: product.price,
        individualQuanty: product.individualQuanty,
        img: product.img,
        spent: product.spent,
        bale: true,
        lastVolumeDate: product.lastVolumeDate,
        productId: product.productId,
      });
      if (request.data.succes) {
        succesMessage(request.data.message);
        return;
      }
      errorMessage(request.data.message);
      return;
    } catch (error) {
      errorMessage("Problema con el servidor al actualizar datos");
      return;
    }
  }

  try {
    const selectedOptions = product.supliers?.map(
      (option: any) => option.value
    );

    const request = await axios.put(`/product/${product.id}`, {
      name: product.name,
      volume: product.volume,
      maximum: product.maximum,
      barCode: product.barCode,
      price: product.price,
      individualQuanty: product.individualQuanty,
      img: product.img,
      spent: product.spent,
      typeId: product.typeId,
      lastVolumeDate: product.lastVolumeDate,
      supliers: selectedOptions,
    });
    if (request.data.succes) {
      succesMessage(request.data.message);
      return;
    }
    errorMessage(request.data.message);
    return;
  } catch (error) {
    errorMessage("Problema con el servidor al actualizar datos");
    return;
  }
};

export { putProductStockService };
