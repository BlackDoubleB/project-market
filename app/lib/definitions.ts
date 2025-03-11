import Decimal from "decimal.js";

export type LatestSale = {
  product_name: string;
  category_name: string;
  image_url: string;
  total: number;
};

export type role = {
  role_id: string;
  role_name: string;
};

export type people = {
  people_id: string;
  dni: string;
  person_name: string;
  lastname: string;
};

export type User = {
  user_id: string;
  role_id: string;
  people_id: string;
  user_name: string;
  password: string;
  date_register: string;
};

export type Category = {
  category_id: string;
  category_name: string;
};

export type Product = {
  product_id: string;
  category_id: string;
  product_name: string;
  image_url: string;
  price: number;
  date_register: string;
};

export type Stock = {
  stock_id: string;
  product_id: string;
  quantity: number;
  date_register: string;
};

// export type Sale = {
//   sale_id: string;
//   user_id: string;
//   method: string;
//   date_register: string;
//   total: number;
// };
//
// export type detail_sale_products = {
//   sale_id: string;
//   product_id: string;
//   quantity: number;
// };
//NAV TABLE
export type NavTableProducts = {
  product_id: string;
  product_name: string;
  image_url: string;
};

//FETCH FILTERED
export type RoleFiltered = {
  role_id: string;
  role_name: string;
};

export type CategoryFiltered = {
  category_id: string;
  category_name: string;
};

export type ProductFiltered = {
  product_id: string;
  category_name: string;
  product_name: string;
  image_url: string;
  price: number;
  date_register: string;
};

export type StockFiltered = {
  stock_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  date_register: string;
};

export type SaleFiltered = {
  user_name: string;
  sale_id: string;
  product_name: string;
  method: string;
  date_register: string;
  total: string;
  quantity: number;
};
//FETCH BY ID
export type SaleById = {
  sale_id: string;
  date_register: string;
  total: number;
  method: "card" | "cash";
  product_id: string;
  category_id: string;
  quantity: number;
};

export type RoleById = {
  role_id: string;
  role_name: string;
};

export type CategoryById = {
  category_id: string;
  category_name: string;
};

export type ProductById = {
  product_id: string;
  category_id: string;
  category_name: string;
  product_name: string;
  image_url: string;
  price: number;
  date_register: string;
};

export type StockById = {
  stock_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  date_register: string;
};

// FETCH ALL
export type RoleFetch = {
  role_id: string;
  role_name: string;
};

export type CategoryFetch = {
  category_id: string;
  category_name: string;
};

export type ProductFetch = {
  product_id: string;
  category_id: string;
  category_name: string;
  product_name: string;
  image_url: string;
  price: number;
  date_register: string;
};

export type SaleFetch = {
  total: number;
  date_register: string;
};

export type UserFetch = {
  role_name: string;
  person_name: string;
  lastname: string;
  dni: string;
  user_name: string;
  password: string;
};

export type SaleTable = {
  id: string;
  product_id: string;
  quantity: number;
};
