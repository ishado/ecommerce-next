import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react';
import React from 'react'

function ProductInfo({product}) {
  return (
    <div>
      <h2 className="text-[20px]">{product?.attributes?.title}</h2>
      <h2 className="text-[15px] text-gray-400">
        {product?.attributes?.category}
      </h2>
      <h2 className="text-[11px] mt-5">
        {product?.attributes?.description[0]?.children[0]?.text}
      </h2>
      <h2 className="flex gap-2 items-center mt-2 text-[11px] text-gray-500">
        {product?.attributes?.instantDelivery ? <BadgeCheck className='text-green-500'/>: <AlertOctagon className='text-yellow-500'/>} Eligible For Instant Delivery
      </h2>
      <h2 className="text-[32px] text-primary mt-3">
        {product?.attributes?.price}
      </h2>
      <button className="flex gap-2 bg-primary text-white hover:bg-teal-600 py-2 px-4 rounded-md mt-5">
        <ShoppingCart />
        Add to cart
      </button>
    </div>
  );
}

export default ProductInfo