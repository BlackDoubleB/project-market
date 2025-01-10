import { db } from "@vercel/postgres";

const client = await db.connect();

async function listSales() {
	const data = await client.sql`
    SELECT 
      sales.amount, 
      products.name AS product_name, 
      categories.name AS categories_name
    FROM sales
    JOIN products ON sales.product_id = products.id
    JOIN categories ON sales.category_id = categories.id
    WHERE sales.amount = 4480;`
	return data.rows;
}

export async function GET() {
  try {
  	return Response.json(await listSales());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}