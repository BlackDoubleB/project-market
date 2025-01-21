'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from "next-auth";

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

const CreateSale = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    productId?: string[];
    categoryId?: string[];
    amount?: string[];
    method?: string[];
  };
  message?: string | null;
};
 
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
  } catch(error) {
    return {
      message: `Database Error: Failed to Create Sale.`, error
    };
  }
  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');
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
    amount: formData.get('amount'),
    method: formData.get('method'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sale.',
    };
  }
 
  const { productId, amount, method } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE sales
      SET product_id = ${productId}, amount = ${amountInCents}, method = ${method}
      WHERE id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Sale.' };

   
  }
 
  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');
}

export async function deleteSale(id: string) {
  // throw new Error('Failed to Delete Sale');
  try {
    await sql`DELETE FROM sales WHERE id = ${id}`;
    revalidatePath('/dashboard/sales');
    return { message: 'Deleted Sale.' };
  } catch(error) {
      console.error('Error deleting sale:', error);
    return { message: 'Database Error: Failed to Delete Sale.' };
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