'use client';

import BreadCrumb from '/app/_components/BreadCrumb';
import ProductApis from '/app/_utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductBanner from '../_components/ProductBanner';
import ProductInfo from '../_components/ProductInfo';
import ProductList from '/app/_components/ProductList';
import { usePathname } from 'next/navigation';

function ProductDetails({params}) {
    const path = usePathname();
    console.log(path);
    const [productDetails, setProductDetails] = useState({});
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        getProductById_();
    }, [params?.productId])
    const getProductById_ = ()=> {
        ProductApis.getProductById(params?.productId).then(res=>{
            console.log('Product Item :', res.data.data);
            setProductDetails(res.data.data),
            getProductListByCategory(res.data.data)
        })
    }
    const getProductListByCategory = (product)=>{
        ProductApis.getProductByCategory(product?.attributes?.category).then(res=>{
            console.log('Product By Category :', res?.data?.data);
            setProductList(res?.data?.data)
        })
    }
    return (
        <div className='px-10 py-8 md:px-28'>
            <BreadCrumb path={path}/>
            <div className='grid grid-cols-1 mt-10 justify-around sm:grid-cols-2 gap-5 sm:gap-3'>
                <ProductBanner product={productDetails} />
                <ProductInfo product={productDetails} />
            </div>
            <div>
                <h2 className='mt-20 mb-4 text-xl'>Similar Products</h2>
                <ProductList productList={productList}/>
            </div>
        </div>
    )
}

export default ProductDetails