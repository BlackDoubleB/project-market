
import { sql } from '@vercel/postgres';
import {
  RolesTable,
  RolesField,
  ProductsTable,
  CategoriesTable,
  CategoryField,
  ProductField,
  RoleForm,
  CategoryForm,
  SaleForm,
  SalesTable,
  LatestSale,
} from './definitions';
import { formatCurrency } from './utils';
import { error } from 'console';



export async function fetchLatestSales() {
  try {
    const data = await sql<LatestSale>`
      SELECT 
      sales.amount, 
      products.id, products.name AS name_product, products.image_url, 
      categories.id, categories.name AS name_category
      FROM sales
      JOIN products ON sales.product_id = products.id
      JOIN categories ON sales.category_id = categories.id
      ORDER BY sales.date DESC
      LIMIT 5`;

    const g: Array<LatestSale> = data.rows.map((sale) => {
      return {
        ...sale,
        amount: formatCurrency(Number(sale.amount)),
      }
    });

    /* const latestSales = data.rows.map((sale) => ({
      ...sale,
      //El sale automaticamente al devolver un objeto por cada iteracion, lo guarda en un array y el return latestSales devolvera eso cuando lo invoquemos
      amount: formatCurrency(sale.amount),
    })); */
    return g;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest sales.');
  }
}

export async function fetchCardData() {
  try {
    const saleCountPromise = sql`SELECT COUNT(*) FROM sales`;
    const productCountPromise = sql`SELECT COUNT(*) FROM products`;
    const saleMethodPromise = sql`SELECT
         SUM(CASE WHEN method = 'cash' THEN amount ELSE 0 END) AS "cash",
         SUM(CASE WHEN method = 'card' THEN amount ELSE 0 END) AS "card"
         FROM sales`;

    const data = await Promise.all([
      saleCountPromise,
      productCountPromise,
      saleMethodPromise,
    ]);

    const numberOfSales = Number(data[0].rows[0].count ?? '0');
    const numberOfProducts = Number(data[1].rows[0].count ?? '0');
    const totalCardSales = formatCurrency(data[2].rows[0].card ?? '0');
    const totalCashSales = formatCurrency(data[2].rows[0].cash ?? '0');

    return {
      numberOfSales,
      numberOfProducts,
      totalCardSales,
      totalCashSales,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

//Sales

export async function fetchFilteredSales(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sales = await sql<SalesTable>`
      SELECT
        sales.id,
        sales.amount,
        sales.date,
        sales.method,
        products.name as product_name,
        products.image_url,
        categories.name as category_name
      FROM sales
      JOIN products ON sales.product_id = products.id
      JOIN categories ON sales.category_id = categories.id
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        categories.name ILIKE ${`%${query}%`} OR
        sales.amount::text ILIKE ${`%${query}%`} OR
        sales.date::text ILIKE ${`%${query}%`} OR
        sales.method ILIKE ${`%${query}%`}
      ORDER BY sales.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sales.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sales.');
  }
}

export async function fetchFilteredRoles(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const roles = await sql<RolesTable>`
      SELECT
        role_id,
        role_name
      FROM roles
      WHERE
        role_name::text ILIKE ${`%${query}%`} 
      ORDER BY role_name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return roles.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch roles.');
  }
}

export async function fetchFilteredCategories(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const categories = await sql<CategoriesTable>`
      SELECT
        category_id,
        category_name
      FROM categories
      WHERE
        category_name::text ILIKE ${`%${query}%`} 
      ORDER BY category_name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductsTable>`
      SELECT
      product_id,
      category_name,
      product_name,
      image_url,
      price,
      date_register
  date
      FROM products
      JOIN categories ON products.category_id = categories.category_id
      WHERE
      product_name::text ILIKE ${`%${query}%`} 
      ORDER BY product_name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchSalesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM sales
    JOIN products ON sales.product_id = products.id
    JOIN categories ON sales.category_id = categories.id
    WHERE
      products.name ILIKE ${`%${query}%`} OR
      categories.name ILIKE ${`%${query}%`} OR
      sales.amount::text ILIKE ${`%${query}%`} OR
      sales.date::text ILIKE ${`%${query}%`} OR
      sales.method ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sales.');
  }
}

export async function fetchRolesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM roles
    WHERE
      role_name::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of roles.');
  }
}

export async function fetchCategoriesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM categories
    WHERE
      category_name::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of roles.');
  }
}

export async function fetchProductsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
      product_name::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Products.');
  }
}

export async function fetchRoleById(id: string) {
  try {
    const data = await sql<RoleForm>`
      SELECT
        role_id,
        role_name
      FROM roles
      WHERE role_id = ${id};
    `;

    const roles = data.rows.map((role) => ({
      ...role,
    }));

    console.log(roles);
    return roles[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch role.');
  }
}

export async function fetchSaleById(id: string) {
  try {
    const data = await sql<SaleForm>`
      SELECT
        sales.id,
        sales.product_id,
        sales.category_id,
        sales.amount,
        sales.method
      FROM sales
      WHERE sales.id = ${id};
    `;

    const sale = data.rows.map((sale) => ({
      ...sale,
      // Convert amount from cents to dollars
      amount: sale.amount / 100,
    }));

    console.log(sale); // Invoice is an empty array []
    return sale[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sale.');
  }
}

export async function fetchCategoryById(id: string) {
  try {
    const data = await sql<CategoryForm>`
      SELECT
        category_id,
        category_name
      FROM categories
      WHERE category_id = ${id};
    `;

    const categories = data.rows.map((category) => ({
      ...category,
    }));

    console.log(categories);
    return categories[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category.');
  }
}

export async function fetchFilteredProductsNav(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductsTable>`
      SELECT
        products.id,
        products.name AS name_product,
        products.image_url
      FROM products
      WHERE
        products.name ILIKE ${`%${query}%`} 
      ORDER BY products.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
//Roles
export async function fetchRoles() {
  try {
    const data = await sql<RolesField>`
      SELECT
      role_id,
      role_name
      FROM roles
      ORDER BY role_name ASC
    `;

    const roles = data.rows;
    return roles;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all roles.');
  }
}
//Categories
export async function fetchCategories() {
  try {
    const data = await sql<CategoryField>`
      SELECT
        category_id,
        category_name
      FROM categories
      ORDER BY category_name ASC
    `;

    const categories = data.rows;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}
//Products
export async function fetchProducts() {
  try {
    const data = await sql<ProductField>`
      SELECT
        products.product_id,
        products.category_id,
        categories.category_name,
        products.product_name,
        products.image_url,
        products.date_register
      FROM products
      JOIN categories ON products.category_id = categories.category_id
      ORDER BY product_name ASC
    `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.' + err);
  }
}
