
//Definimos manualmente los tipos que se devolverán desde la base de datos.
export type role = {
  id: string,
  name: string
}

export type people = {
  id: string,
  dni: string,
  name: string,
  lastname: string,
  date_register: string
}

export type User = {
  id: string,
  id_role: string,
  id_people: string,
  user_name: string,
  password: string,
  date_login: string
};

export type Category = {
  id: string,
  category_name: string
};

export type Product = {
  id: string,
  id_category: string,
  name: string,
  image_url: string,
  price: number,
  date: string
};

export type Stock = {
  id: string,
  id_product: string,
  quantity: number,
  date: string
};

export type Sale = {
  id: string,
  id_user: string,
  method: string,
  date: string,
  total: number,
};

export type detail_sale_products = {
  id_sale: string,
  id_product: string,
  quantity: number
};

// ADICIONAL

export type LatestSale = {
  id: string;
  name_product: string;
  name_category: string;
  image_url: string;
  amount: string | number;
};

export type ProductsTable = {
  id: string;
  name_product: string;
  image_url: string;
};

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
  category_id: string;
  amount: number;
  method: 'card' | 'cash';
};

//ACTUALIZACION
export type RolesField = {
  id: string;
  name: string;
};