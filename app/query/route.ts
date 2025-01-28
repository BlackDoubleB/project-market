import { db } from "@vercel/postgres";

const client = await db.connect();

async function listSales() {
	const data = await client.sql`
    SELECT 
      sales.id, 
      sales.method,
      sales.date,
      sales.total,
      users.id AS id_user 
    FROM sales
    JOIN users ON sales.id_user = users.id
    WHERE sales.total = 3040;`
	return data.rows;
}

export async function GET() {
  try {
    const sales = await listSales();
    return new Response(JSON.stringify(sales), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
