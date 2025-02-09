export interface Haircut {
  _id: string;
  name: string;
  gender: 'male' | 'female';
  price: number;
  branch: string;
}

export interface UpdateHaircutDto {
  name?: string;
  price?: number;
}

export interface CreateHaircutDto {
  name: string;
  gender: 'male' | 'female';
  price: number;
}

export interface HaircutPriceHistory {
  changeNumber: number;
  oldPrice: number;
  newPrice: number;
  changedAt: string;
  priceDifference: number;
}
