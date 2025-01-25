import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

import { sales, products, revenue, users, categories } from '../lib/placeholder-data';

const client = await db.connect();


async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      
    }),
  );

  return insertedUsers;
}

async function seedSales() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS sales (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL,
      category_id UUID NOT NULL,
      amount INT NOT NULL,
      method VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedSales = await Promise.all(
    sales.map(
      (sale) => client.sql`
        INSERT INTO sales (product_id, category_id, amount, method, date)
        VALUES (${sale.product_id},${sale.category_id}, ${sale.amount}, ${sale.method}, ${sale.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSales;
}

async function seedProducts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => client.sql`
        INSERT INTO products (id, name, image_url)
        VALUES (${product.id}, ${product.name}, ${product.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedCategories(){
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS categories(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  `;

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
      INSERT INTO categories (id, name)
      VALUES (${category.id}, ${category.name})
      ON CONFLICT (id) DO NOTHING
      `
    )
  );
  return insertedCategories
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedProducts();
    await seedCategories();
    await seedSales();
    await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  } finally {
    client.release(); // Libera la conexión al pool
  }
}
// la función debe llamarse GET si quieres que se ejecute cuando el cliente haga una solicitud HTTP GET.
