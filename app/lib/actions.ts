'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from "next-auth";
import bcrypt from 'bcrypt';

const FormSchemaUser = z.object({
  role_id: z.string({
    invalid_type_error: 'Please select a role.',
  }),
  user_name: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  person_name: z.string().min(1, 'Name is required'),
  dni: z.string().min(1, 'DNI is required'),
  lastname: z.string().min(1, 'Last Name is required'),
});

const FormSchemaRole = z.object({
  role_name: z.string().min(1, 'role name is required'),
});

const FormSchemaCategory = z.object({
  category_name: z.string().min(1, 'category name is required'),
});

const FormSchemaProduct = z.object({
  product_name: z.string().min(1, 'product name is required'),
  category_id: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  image_url: z.string().min(1, 'image is required'),
  price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' })
});

const FormSchemaStock = z.object({
  quantity: z.coerce.number().gt(0, { message: 'Please enter an number' }),
  product_id: z.string({ invalid_type_error: 'Please select a product.' }),
});

const FormSchemaSale = z.object({
  products: z.array(
    z.object({
      product_id: z.string(),
      quantity: z.coerce.number(),
    })
  ),
  method: z.enum(["cash", "card"]),
});



export type StateUser = {
  errors?: {
    role_id?: string[];
    person_name?: string[];
    dni?: string[];
    lastname?: string[]
    user_name?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type StateRole = {
  errors?: {
    role_name?: string[];
  };
  message?: string | null;
};

export type StateCategory = {
  errors?: {
    category_name?: string[];
  };
  message?: string | null;
};

export type StateProduct = {
  errors?: {
    product_name?: string[];
    category_id?: string[];
    image_url?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type StateStock = {
  errors?: {
    quantity?: string[];
    product_id?: string[];
  };
  message?: string | null;
};


export type StateSale = {
  errors?: {
    products?: string[];
    method?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: StateUser, formData: FormData) {
  const validatedFields = FormSchemaUser.safeParse({
    role_id: formData.get('role_id'),
    person_name: formData.get('person_name'),
    dni: formData.get('dni'),
    lastname: formData.get('lastname'),
    user_name: formData.get('user_name'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { role_id, person_name, dni, lastname, user_name, password } = validatedFields.data;

  try {
    const resultPeople = await sql`
      INSERT INTO people (dni, person_name, lastname)
      VALUES (${dni}, ${person_name}, ${lastname})
      RETURNING person_id
      `;

    const person_id = resultPeople.rows[0]?.person_id;
    const hashedPassword = await bcrypt.hash(password, 10)
    const date_register = new Date();

    await sql`
      INSERT INTO users (role_id, person_id, user_name, password, date_register)
      VALUES (${role_id}, ${person_id}, ${user_name}, ${hashedPassword},${date_register.toISOString()})
    `;

  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return {
      message: 'Database Error: Failed to Create User.',
      error: error
    };
  }
  revalidatePath('/login/create');
  redirect('/login');
}

export async function createRole(prevState: StateRole, formData: FormData) {
  const validatedFields = FormSchemaRole.safeParse({
    role_name: formData.get('role_name')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Field. Failed to Create Role.',
    };
  }

  const { role_name } = validatedFields.data;

  try {
    await sql`
      INSERT INTO roles (role_name)
      VALUES (${role_name})
    `;

  } catch (error) {
    console.error("❌ Error al crear rol:", error);
    return {
      message: 'Database Error: Failed to Create Rol.',
      error: error
    };
  }
  revalidatePath('/dashboard/roles');
  redirect('/dashboard/roles');
}

export async function createCategory(prevState: StateCategory, formData: FormData) {
  const validatedFields = FormSchemaCategory.safeParse({
    category_name: formData.get('category_name')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Field. Failed to Create Category.',
    };
  }

  const { category_name } = validatedFields.data;

  try {
    await sql`
      INSERT INTO categories (category_name)
      VALUES (${category_name})
    `;

  } catch (error) {
    console.error("❌ Error al crear categoria:", error);
    return {
      message: 'Database Error: Failed to Create Category.',
      error: error
    };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function createProduct(prevState: StateProduct, formData: FormData) {
  const validatedFields = FormSchemaProduct.safeParse({
    product_name: formData.get('product_name'),
    category_id: formData.get('category_id'),
    image_url: formData.get('image_url'),
    price: formData.get('price'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { product_name, category_id, image_url, price } = validatedFields.data;

  try {
    const date_register = new Date();

    if (!product_name || !category_id || !image_url || !price) {
      throw new Error("Missing required fields");
    }
    const insertResult = await sql`
      INSERT INTO products (product_name, category_id, image_url, price, date_register)
      VALUES (${product_name}, ${category_id}, ${image_url}, ${price}, ${date_register.toISOString()})
    `;

    if (!insertResult) {
      throw new Error("Failed to insert product into the database");
    }

  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    return {
      message: 'Database Error: Failed to Create Product.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function createStock(prevState: StateStock, formData: FormData) {
  const validatedFields = FormSchemaStock.safeParse({
    quantity: formData.get('quantity'),
    product_id: formData.get('product_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Field. Failed to Create Stock.',
    };
  }

  const { quantity, product_id } = validatedFields.data;

  try {
    const date_register = new Date();
    await sql`
      INSERT INTO stock (quantity,product_id,date_register)
      VALUES (${quantity},${product_id},${date_register.toISOString()})
    `;

  } catch (error) {
    console.error("❌ Error al crear stock:", error);
    return {
      message: 'Database Error: Failed to Create Stock.',
      error: error
    };
  }
  revalidatePath('/dashboard/stock');
  redirect('/dashboard/stock');
}

export async function createSale(prevState: StateSale, formData: FormData) {
  const productsJson = formData.get('selectedDetailSaleProduct') as string;
  const methodJson = formData.get('method') as string;

  // Convertimos los valores JSON en objetos
  const parsedProducts = productsJson ? JSON.parse(productsJson).products : [];
  const parsedMethod = methodJson ? JSON.parse(methodJson).method : '';

  const validatedFields = FormSchemaSale.safeParse({
    products: parsedProducts,
    method: parsedMethod,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Field. Failed to Create Sale.',
    };
  }

  const { products, method } = validatedFields.data;

  try {
    let total: number = 0;
    let quantity: number = 0;
    let price: number = 0

    for (const product of products) {
      quantity = product.quantity;
      const productResult = await sql`SELECT price FROM products WHERE product_id = ${product.product_id}`;
      price = productResult.rows[0]?.price || 0;
      total += quantity * price;
    }
    const date_register = new Date();
    const userResult = await sql`SELECT user_id FROM users WHERE user_name = ${'User'}`;
    const user_id = userResult.rows[0]?.user_id;


    await sql`BEGIN;`;


    const saleResult = await sql`
      INSERT INTO sales (user_id, method, date_register, total)
      VALUES (${user_id}, ${method}, ${date_register.toISOString()}, ${total})
      RETURNING sale_id;
    `;
    const sale_id = saleResult.rows[0].sale_id;


    for (const product of products) {

      await sql`
        INSERT INTO detail_sale_products (sale_id, product_id, quantity)
        VALUES (${sale_id}, ${product.product_id}, ${product.quantity});
      `;


      await sql`
        UPDATE stock
        SET quantity = quantity - ${product.quantity}
        WHERE product_id = ${product.product_id};
      `;
    }

    // Confirmar transacción
    await sql`COMMIT;`;
  } catch (error) {
    console.error("❌ Error al crear la venta:", error);
    await sql`ROLLBACK;`;
    return {
      message: "Error en la base de datos. No se pudo crear la venta.",
      error,
    };
  }

  revalidatePath("/dashboard/sales");
  redirect("/dashboard/sales");
}

export async function updateRole(
  id: string,
  prevState: StateRole,
  formData: FormData,
) {
  const validatedFields = FormSchemaRole.safeParse({
    role_name: formData.get('role_name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Roles.',
    };
  }

  const { role_name } = validatedFields.data;

  try {
    await sql`
      UPDATE roles
      SET role_name = ${role_name}
      WHERE role_id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Role.' };
  }
  revalidatePath('/dashboard/roles');
  redirect('/dashboard/roles');
}

export async function updateCategory(
  id: string,
  prevState: StateCategory,
  formData: FormData,
) {
  const validatedFields = FormSchemaCategory.safeParse({
    category_name: formData.get('category_name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Categories.',
    };
  }

  const { category_name } = validatedFields.data;

  try {
    await sql`
      UPDATE categories
      SET category_name = ${category_name}
      WHERE category_id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Categories.' };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function updateProduct(
  id: string,
  prevState: StateProduct,
  formData: FormData,
) {
  const validatedFields = FormSchemaProduct.safeParse({
    product_name: formData.get('product_name'),
    category_id: formData.get('category_id'),
    image_url: formData.get('image_url'),
    price: formData.get('price')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Categories.',
    };
  }
  const { product_name, category_id, image_url, price } = validatedFields.data;

  try {
    // eslint-disable-next-line
    let date_register = new Date();

    if (!product_name || !category_id || !image_url || !price) {
      throw new Error("Missing required fields");
    }

    await sql`
      UPDATE products
      SET product_name = ${product_name}, category_id = ${category_id}, image_url = ${image_url}, price = ${price}, date_register = ${date_register.toISOString()}
      WHERE product_id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Products.' };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateStock(
  id: string,
  prevState: StateStock,
  formData: FormData,
) {
  const validatedFields = FormSchemaStock.safeParse({
    quantity: formData.get('quantity'),
    product_id: formData.get('product_id')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Stock.',
    };
  }

  const { quantity, product_id } = validatedFields.data;

  try {
    await sql`
      UPDATE stock
      SET quantity = ${quantity}, product_id = ${product_id}
      WHERE stock_id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Stock.' };
  }
  revalidatePath('/dashboard/stock');
  redirect('/dashboard/stock');
}

export async function deleteRole(id: string) {
  await sql`DELETE FROM roles WHERE role_id = ${id}`;
  revalidatePath('/dashboard/roles');
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    await sql`DELETE FROM categories WHERE category_id = ${id}`;
    revalidatePath('/dashboard/categories');
    return true; // Indica que la eliminación fue exitosa

  } catch (error) {
    console.error('Error deleting category:', error);
    return false; // Indica que hubo un error
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await sql`DELETE FROM products WHERE product_id = ${id}`;
    revalidatePath('/dashboard/products');
    return true;

  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export async function deleteStock(id: string): Promise<boolean> {
  try {
    await sql`DELETE FROM stock WHERE stock_id = ${id}`;
    revalidatePath('/dashboard/stock');
    return true;

  } catch (error) {
    console.error('Error deleting stock:', error);
    return false;
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}