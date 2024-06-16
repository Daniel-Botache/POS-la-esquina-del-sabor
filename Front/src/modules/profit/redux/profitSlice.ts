import { createSlice } from "@reduxjs/toolkit";

type Products = {
  id: number;
  name: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
  img: string;
  lastVolumeDate: Date;
  createdAt: Date;
  updatedAt: Date;
  typeId: string;
};
type Bales = {
  id: number;
  name: string;
  volume: number;
  maximum: number;
  individualQuanty: number;
  barCode: string;
  price: number;
  spent: boolean;
  img: string;
  lastVolumeDate: Date;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  bale: boolean;
};

type Sales = {
  id: number;
  paymentType: string;
  movementType: string;
  total: number;
  credit: boolean;
  clientId: string | null;
  valueCash: number;
  valueTransaction: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  products: Products[];
  bales: Bales[];
};

export interface profitState {
  sales: Sales[];
}
