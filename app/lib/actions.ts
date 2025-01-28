'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from "next-auth";
import bcrypt from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  productId: z.string({
    invalid_type_error: 'Please select a product.',
  }),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  method: z.enum(['cash', 'card'], {
    invalid_type_error: 'Please select an sale method.',
  }),
  date: z.string(),
});

const FormSchemaUser = z.object({
  // Campos de la tabla 'user'
  id_role: z.string({
    invalid_type_error: 'Please select a role.',
  }),
  user_name: z.string(),
  password: z.string(),
  // Campos de la tabla 'people'
  people_name: z.string().min(1, 'Name is required'),
  dni: z.string().min(1, 'DNI is required'),
  last_name: z.string().min(1, 'Last Name is required'),
});

const CreateSale = FormSchema.omit({ id: true, date: true });
const CreateProduct = FormSchema.omit({ id: true, date: true, categoryId: true, amount: true, method: true });

export type State = {
  errors?: {
    productId?: string[];
    categoryId?: string[];
    amount?: string[];
    method?: string[];
  };
  message?: string | null;
};

export type StateUser = {
  errors?: {
    id_role?: string[];
    user_name?: string[];
    password?: string[];
    people_name?: string[];
    dni?: string[];
    last_name?: string[]
  };
  message?: string | null;
};


export async function createUser(prevState: StateUser, formData: FormData) {
  const validatedFields = FormSchemaUser.safeParse({
    id_role: formData.get('id_role'),
    user_name: formData.get('user_name'),
    password: formData.get('password'),
    people_name: formData.get('people_name'),
    dni: formData.get('dni'),
    last_name: formData.get('last_name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { id_role, user_name, password, people_name, dni, last_name } = validatedFields.data;
  const date_register = new Date();

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await sql`
      INSERT INTO people (people_name, dni, last_name, register_date)
      VALUES (${people_name}, ${dni}, ${last_name}, ${date_register.toISOString()})
      RETURNING id
    `;

    const id_people_generated = result.rows[0].id;

    await sql`
      INSERT INTO users (id_role, id_people, user_name, password)
      VALUES (${id_role}, ${id_people_generated}, ${user_name}, ${hashedPassword})
    `;

    revalidatePath('/login/create');
    redirect('/login');
  } catch (error) {
    return {
      message: `Database Error: Failed to Create User.`, error
    };
  }
}
  

export async function createSale(prevState: State, formData: FormData) {
  const validatedFields = CreateSale.safeParse({
    productId: formData.get('productId'),
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
    method: formData.get('method'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Sale.',
    };
  }

  const { productId, categoryId, amount, method } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO sales (product_id, category_id, amount, method, date)
      VALUES (${productId},${categoryId}, ${amountInCents}, ${method}, ${date})
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Sale.`, error
    };
  }
  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');
}

export async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    productId: formData.get('productId')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { productId } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (product_id,)
      VALUES (${productId})
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Product.`, error
    };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

// Use Zod to update the expected types
const UpdateSale = FormSchema.omit({ id: true, date: true });

export async function updateSale(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateSale.safeParse({
    productId: formData.get('productId'),
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
    method: formData.get('method'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sale.',
    };
  }

  const { productId, categoryId, amount, method } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE sales
      SET product_id = ${productId},category_id = ${categoryId}, amount = ${amountInCents}, method = ${method}
      WHERE id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Sale.' };


  }
  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');
}

export async function deleteSale(id: string) {
  await sql`DELETE FROM sales WHERE id = ${id}`;
  revalidatePath('/dashboard/sales');
}
export async function deleteProduct(id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath('/dashboard/products');
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