export interface IProduct {
  name: string;
  _id: string;
  price: number;
  imagePath: string;
  description: string;
  ingredients: {
    _id: string;
    icon: string;
    name: string;
  }[];
}
