import axios from "axios";

export async function putProductService(products: any) {
  if (products) {
    const keysArray = Object.keys(products);
    keysArray.forEach(async (product) => {
      const volume = products[product].volume - products[product].quantity;
      await axios.put(`/product/${product}`, { volume: volume });
    });
  }
}
