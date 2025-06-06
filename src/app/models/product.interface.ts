export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  discount: number;
  installments: number;
  freeShipping: boolean;
  rating: {
    rate: number;
    count: number;
  };
  specs: {
    battery: string;
    bluetooth: string;
    waterproof: string;
  };
  vendor: {
    vendorName: string;
    vendorCategory: string;
    vendorSales: number;
  };
}