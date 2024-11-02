export interface Product {
    id: number;
    brand: string;
    name: string;
    price: string;
    image_link: string;
    description: string;
    category: string;
    product_type: string;
  }
  
export interface FilterOptions {
    search: string;
    brand: string;
    productType: string;
    minPrice: number;
    maxPrice: number;
  }