import axios from "axios";

export async function putProductService(products: any) {
  if (products) {
    const keysArray = Object.keys(products);
    keysArray.forEach(async (product) => {
      if (products[product].bale) {
        const volume = products[product].volume - products[product].quantity;
        await axios.put(`/bale/${product}`, { volume: volume });
        const productId = products[product].productId;
        const productIndividual = await axios.get(`/product/${productId}`);
        console.log(productIndividual.data.succes);
        const volumeIndividual = productIndividual.data.succes.volume;
        const quantityPerBale = products[product].individualQuanty;
        const newVolumeIndividual =
          volumeIndividual - quantityPerBale * products[product].quantity;
        await axios.put(`/product/${productId}`, {
          volume: newVolumeIndividual,
        });
      } else {
        const volume = products[product].volume - products[product].quantity;
        await axios.put(`/product/${product}`, { volume: volume });
      }
    });
  }
}
