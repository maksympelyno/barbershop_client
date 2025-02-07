export interface Haircut {
  _id: string;
  name: string;
  gender: 'male' | 'female';
  price: number;
  branch: string;
}
