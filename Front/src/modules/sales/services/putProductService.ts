import axios from "axios";

export async function putProductService(products: any) {
  if (products) {
    const keysArray = Object.keys(products);
    for (const product of keysArray) {
      if (products[product].bale) {
        const itemSearchedBale = await axios.get(`/bale/${product}`);
        const volume =
          itemSearchedBale.data.volume - products[product].quantity;

        const productId = products[product].productId;
        const productIndividual = await axios.get(`/product/${productId}`);
        const volumeIndividual = productIndividual.data.succes.volume;
        const quantityPerBale = products[product].individualQuanty;
        const newVolumeIndividual =
          volumeIndividual - quantityPerBale * products[product].quantity;
        await axios.put(`/product/${productId}`, {
          volume: newVolumeIndividual,
        });
        await axios.put(`/bale/${product}`, { volume: volume });
      } else {
        const volumeItem =
          products[product].volume - products[product].quantity;
        const itemSearched = await axios.get(`/product/${product}`);
        const baleArray = itemSearched.data.succes.bales;
        await axios.put(`/product/${product}`, { volume: volumeItem });
        for (const bale of baleArray) {
          const baleVolume = Math.floor(volumeItem / bale.individualQuanty);
          await axios.put(`/bale/${bale.id}`, { volume: baleVolume });
        }
      }
    }
  }
}
