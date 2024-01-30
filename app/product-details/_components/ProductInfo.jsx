'use client'

import SkeletonProductInfo from '/app/product-details/_components/SkeletonProductInfo';
import { useUser } from '@clerk/nextjs';
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import CartApis from '../../_utils/CartApis'
import { CartContext } from "../../_context/CartContext";

function ProductInfo({product}) {
  const {user} = useUser();
  const router = useRouter();
  const {cart , setCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if(!user){
      router.push('/sign-in');
    }else {
      // Logic to add to Cart
      const data = {
        data: {
          username : user.fullName,
          email : user.primaryEmailAddress.emailAddress,
          products : [product?.id]
        }
      }
      CartApis.addToCart(data).then(res=>{
        console.log("Cart Created Successfully");
        setCart((oldCart) => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product,
          },
        ]);
      }).catch(error => {
        console.log('Error while creating Cart : ', error);
      });
    }
  };
  return (
    <div>
        {product?.id ?
        <div>
        <h2 className="text-[20px]">{product?.attributes?.title}</h2>
        <h2 className="text-[15px] text-gray-400">
          {product?.attributes?.category}
        </h2>
        <h2 className="text-[11px] mt-5">
          {product?.attributes?.description[0]?.children[0]?.text}
        </h2>
        <h2 className="flex gap-2 items-center mt-2 text-[11px] text-gray-500">
          {product?.attributes?.instantDelivery ? (
            <BadgeCheck className="text-green-500" />
          ) : (
            <AlertOctagon className="text-yellow-500" />
          )}{" "}
          Eligible For Instant Delivery
        </h2>
        <h2 className="text-[32px] text-primary mt-3">
          {product?.attributes?.price}
        </h2>
        <button onClick={()=>handleAddToCart()} className="flex gap-2 bg-primary text-white hover:bg-teal-600 py-2 px-4 rounded-md mt-5">
          <ShoppingCart />
          Add to cart
        </button>
      </div>  
        :
        <SkeletonProductInfo />
        }
    </div>
  );
}

export default ProductInfo