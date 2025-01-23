//Definimos manualmente los tipos que se devolverán desde la base de datos.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export type Product = {
    id: string;
    name_product: string;
    image_url: string;
  };

  export type Category = {
    id: string;
    name_category: string;
  };
  
  export type Sale = {
    id: string;
    product_id: string;
    category_id:string;
    amount: number;
    date: string;
    method: 'card' | 'cash';
  };
  
  export type Revenue = {
    month: string;
    revenue: number;
  };
  

  export type LatestSale = {
    id: string;
    name_product: string;
    name_category: string;
    image_url: string;
    amount: string | number;
  };
  
  /* export type LatestSaleRaw = Omit<LatestSale, 'amount'> & {
    amount: number;
  }; */
  
  export type SalesTable = {
    id: string;
    product_name: string;
    category_name: string;
    image_url: string;
    date: string;
    amount: number;
    method: 'card' | 'cash';
  };
  
  export type ProductsTableType = {
    id: string;
    name: string;
    image_url: string;
    total_sales: number;
    total_card: number;
    total_cash: number;
  };
  
  export type FormatedProductsTable = {
    id: string;
    name: string;
    image_url: string;
    total_sales: number;
    total_card: string;
    total_cash: string;
  };
  
  export type ProductField = {
    id: string;
    name: string;
  };

  export type CategoryField = {
    id: string;
    name: string;
  };
  
  export type SaleForm = {
    id: string;
    product_id: string;
    amount: number;
    method: 'card' | 'cash';
  };