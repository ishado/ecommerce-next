import Image from 'next/image'
import React from 'react'

function ProductBanner({ product}) {
  return (
    <div>
        <Image 
            src={product?.attributes?.banner?.data?.attributes?.url}
            alt={product?.attributes?.title}
            width={400}
            height={400}
            className='rounded-lg'
        />
    </div>
  )
}

export default ProductBanner