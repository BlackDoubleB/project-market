"use client";
import { deleteCategory } from '@/app/lib/actions';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import {AlertDanger} from '@/app/ui/alerts'
import { useState } from 'react';
export function CreateCategory() {
  return (
    <Link
      href="/dashboard/categories/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Category</span>{' '}
      <Icon icon="mdi:plus" className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/categories/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Icon icon="mdi:pencil" className="w-5" />
    </Link>
  );
}

export function DeleteCategory({ id }: { id: string }) {
  const [error, setError] = useState<boolean>(false); 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setError(false);  
    const result = await deleteCategory(id); 
    if (!result) {
      setError(true); 
    } else {
      setError(false); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <Icon icon="mi:delete" className="w-4" />
        </button>
      </form>
      {error && <AlertDanger message={"Un producto fue registrado con la categoría"} />}
    </>
  );
}



