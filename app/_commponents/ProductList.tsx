import React from 'react'
import ProductItem from './ProductItem'

type ImageType = {
    formats: {
        thumbnail: {
            url: string
        }
    }
    url: string
}

export type ProductType = {
    id: number,
    title: string,
    price: number,
    image: string,
    category: string,
    description: string,
    instantDelivery: boolean,
    whatsincluded: string,
    banner: ImageType,
    files: ImageType[]
}

export type ProductListProps = {
    productList: ProductType[]
};


export default function ProductList({ productList }: ProductListProps) {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
            {
                productList.map((product: ProductType) => {
                    return(
                        <ProductItem  key={product.id} product={product}/>
                    )
                })

            }
    </div>
  )
}
