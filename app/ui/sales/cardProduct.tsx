"use client"
import { v4 as uuidv4 } from 'uuid';
import {Icon} from "@iconify/react";
import {ProductFetch, SaleTable} from "@/app/lib/definitions";


export default function CardProduct({dsp, index, products}: { dsp:SaleTable, index:number, products: ProductFetch[] })
{
    return(
        <div>
            <div className='pb-2' key={dsp.id}>
                <div className='bg-neutral-400 p-4 rounded-md border border-slate-300 shadow-lg shadow-black-500/50'>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
                            Choose Product
                        </label>

                        <div className="relative">
                            <select
                                id="product_id"
                                className="bg-white block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 outline-none h-10"
                                aria-describedby={`product_id-error-${index}`}
                                defaultValue=""
                                onChange={(e) => updateProductId(index, e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a Product
                                </option>
                                {products.map((product) => (
                                    <option key={product.product_id} value={product.product_id}>
                                        {product.product_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {stateSelect[index] === "" ?  state.errors?.products && state.errors?.products.length > 0 &&
                            state.errors.products.find(x => x.index == index) && (
                                <p className="mt-2 text-sm text-red-500" id={`product_id-error-${index}`}>
                                    {state.errors.products.find(x => x.index == index)?.message}
                                </p>
                            ): ""}




                        {/*{JSON.stringify(state.errors?.products)}*/}

                    </div>
                    {/* Category Name */}
                    <div className="mb-4 pointer-events-none">
                        <p className="mb-2 block text-sm font-medium">
                            Category
                        </p>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <p className=" block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm outline-2 h-10">
                                    {dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.category_name : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="mb-4 pointer-events-none">
                        <p className="mb-2 block text-sm font-medium">
                            Image
                        </p>
                        <div className="relative mt-2">
                            <div className="relative w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                                {dsp.product_id && Array.isArray(products) &&
                                products.find((product) => product.product_id === dsp.product_id)?.image_url ?
                                    (<img src={products.find((product) => product.product_id === dsp.product_id)?.image_url} alt="Product" className="block w-full rounded-lg" />)
                                    :
                                    (<Icon icon="lets-icons:img-box" className="w-16 h-16 text-gray-400" />)
                                }
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pointer-events-none">
                        <p className="mb-2 block text-sm font-medium">
                            Price
                        </p>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <p className="block w-full rounded-md border bg-white border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 h-10">
                                    {dsp.product_id ? products.find((product) => product.product_id === dsp.product_id)?.price : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <label htmlFor={`quantity`} className="mb-2 block text-sm font-medium">Quantity</label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative flex items-center">
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(index, dsp.quantity - 1)}
                                    className="bg-gray-200 px-3 py-1 rounded-l-lg hover:bg-neutral-500 h-10"
                                >
                                    -
                                </button>
                                <input
                                    id='quantity'
                                    type="number"
                                    min={1}
                                    value={dsp.quantity}
                                    readOnly
                                    className="w-20 text-center bg-white border-t border-b border-gray-200 h-10 pointer-events-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(index, dsp.quantity + 1)}
                                    className="bg-gray-200 px-3 py-1 rounded-r-lg hover:bg-neutral-500  h-10"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}