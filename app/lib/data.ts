
import { sql } from '@vercel/postgres';
import {
  ProductField,
  ProductsTableType,
  SaleForm,
  SalesTable,
  LatestSaleRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {

  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;
    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestSales() {
  try {
    const data = await sql<LatestSaleRaw>`
      SELECT 
      sales.amount, 
      products.id, products.name, products.image_url, 
      categories.id, categories.name
      FROM sales
      JOIN products ON sales.product_id = products.id
      JOIN categories ON sales.category_id = categories.id
      ORDER BY sales.date DESC
      LIMIT 5`;

    const latestSales = data.rows.map((sale) => ({
      ...sale,
      amount: formatCurrency(sale.amount),
    }));
    return latestSales;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest sales.');
  }
}

export async function fetchCardData() {
  try {
    const saleCountPromise = sql`SELECT COUNT(*) FROM sales`;
    const productCountPromise = sql`SELECT COUNT(*) FROM products`;
    const saleStatusPromise = sql`SELECT
         SUM(CASE WHEN method = 'cash' THEN amount ELSE 0 END) AS "cash",
         SUM(CASE WHEN method = 'card' THEN amount ELSE 0 END) AS "card"
         FROM sales`;

    const data = await Promise.all([
        saleCountPromise,
        productCountPromise,
        saleStatusPromise,
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
        sales.status,
        products.name,
        products.image_url
        categories.name
      FROM sales
      JOIN products ON sales.customer_id = products.id
      JOIN categories ON sales.category_id = categories.id
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        categories.name ILIKE ${`%${query}%`} OR
        sales.amount::text ILIKE ${`%${query}%`} OR
        sales.date::text ILIKE ${`%${query}%`} OR
        sales.status ILIKE ${`%${query}%`}
      ORDER BY sales.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sales.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sales.');
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
      sales.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sales.');
  }
}

export async function fetchSaleById(id: string) {
  try {
    const data = await sql<SaleForm>`
      SELECT
        sales.id,
        sales.product_id,
        sales.category_id
        sales.amount,
        sales.status
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

export async function fetchProducts() {
  try {
    const data = await sql<ProductField>`
      SELECT
        id,
        name
      FROM products
      ORDER BY name ASC
    `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}

export async function fetchFilteredProducts(query: string) {
  try {
    const data = await sql<ProductsTableType>`
		SELECT
		  products.id,
		  products.name,
		  products.image_url,
		  COUNT(sales.id) AS total_sales,
		  SUM(CASE WHEN sales.method = 'cash' THEN sales.amount ELSE 0 END) AS total_cash,
		  SUM(CASE WHEN sales.method = 'card' THEN sales.amount ELSE 0 END) AS total_card
		FROM products
		LEFT JOIN sales ON products.id = sales.product_id
		WHERE
		  products.name ILIKE ${`%${query}%`}
		GROUP BY products.id, products.name, products.image_url
		ORDER BY products.name ASC
	  `;

    const products = data.rows.map((product) => ({
      ...product,
      total_card: formatCurrency(product.total_card),
      total_cash: formatCurrency(product.total_cash),
    }));

    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product table.');
  }
}
