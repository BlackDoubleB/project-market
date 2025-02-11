
import { sql } from '@vercel/postgres';
import {
  NavTableProducts,
  LatestSale,
  RoleFiltered,
  CategoryFiltered,
  ProductFiltered,
  StockFiltered,
  SaleFiltered,
  CategoryById,
  RoleById,
  ProductById,
  StockById,
  RoleFetch,
  CategoryFetch,
  ProductFetch

} from './definitions';
import { formatCurrency } from './utils';


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

//FECTH FILTERED
export async function fetchFilteredRoles(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const roles = await sql<RoleFiltered>`
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
    const categories = await sql<CategoryFiltered>`
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
    const products = await sql<ProductFiltered>`
      SELECT
      products.product_id,
      categories.category_name,
      products.product_name,
      products.image_url,
      products.price,
      products.date_register

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

export async function fetchFilteredStock(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const stock = await sql<StockFiltered>`
      SELECT
           stock.stock_id,
           products.product_id,
           products.product_name,
           stock.quantity,
           stock.date_register
      FROM stock
      JOIN products ON stock.product_id = products.product_id
      WHERE
        product_name::text ILIKE ${`%${query}%`} 
      ORDER BY product_name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return stock.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stock.');
  }
}

export async function fetchFilteredSales(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sales = await sql<SaleFiltered>`
      SELECT
           sales.sale_id,
           users.user_name,
           sales.method,
           sales.date_register,
           sales.total,
           detail_sale_products.quantity,
           products.product_name

      FROM sales
      JOIN users ON sales.user_id = users.user_id
      JOIN detail_sale_products ON detail_sale_products.sale_id = sales.sale_id
      JOIN products ON detail_sale_products.product_id = products.product_id
      WHERE
        products.product_name::text ILIKE ${`%${query}%`}
      ORDER BY products.product_name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sales.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sales.');
  }
}

//FETCH PAGES
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

export async function fetchStockPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM stock
    JOIN products ON products.product_id = stock.product_id
    WHERE
      product_name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Stocks.');
  }
}

export async function fetchSalesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM sales
    JOIN users ON users.user_id = sales.user_id
    JOIN detail_sale_products ON detail_sale_products.sale_id = sales.sale_id
    JOIN products ON products.product_id = detail_sale_products.product_id
    WHERE
      products.product_name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sales.');
  }
}

//FETCH BY ID
export async function fetchCategoryById(id: string) {
  try {
    const data = await sql<CategoryById>`
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

export async function fetchRoleById(id: string) {
  try {
    const data = await sql<RoleById>`
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

export async function fetchProductById(id: string) {
  try {
    const data = await sql<ProductById>`
      SELECT
          products.product_id,
          categories.category_id,
          categories.category_name,
          products.product_name,
          products.image_url,
          products.price,
          products.date_register
      FROM products
      JOIN categories ON products.category_id = categories.category_id
      WHERE product_id = ${id}
    `;

    const products = data.rows.map((product) => ({
      ...product,
    }));

    console.log(products);
    return products[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchStockById(id: string) {
  try {
    const data = await sql<StockById>`
      SELECT
        stock.stock_id,
        products.product_id,
        products.product_name,
        stock.quantity,
        stock.date_register
      FROM stock
      JOIN products ON products.product_id = stock.product_id
      WHERE stock_id = ${id};
    `;

    const stock = data.rows.map((st) => ({
      ...st,
    }));

    console.log(stock);
    return stock[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stock.');
  }
}

export async function fetchFilteredProductsNav(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<NavTableProducts>`
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

//FECTH ALL
export async function fetchRoles() {
  try {
    const data = await sql<RoleFetch>`
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

export async function fetchCategories() {
  try {
    const data = await sql<CategoryFetch>`
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

export async function fetchProducts() {
  try {
    const data = await sql<ProductFetch>`
      SELECT
        products.product_id,
        products.category_id,
        categories.category_name,
        products.product_name,
        products.price,
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
