import React, { useEffect } from 'react'
import productApi from '@/app/_utils/ProductApi';
import { useState } from "react";
import { ProductType } from '@/app/_commponents/ProductList';
import ProductItem from '@/app/_commponents/ProductItem';





export default function SimllerProducts({category} : {category: string}) {

    const [productsList, setProductsList] = useState();
    useEffect(() => {
        getProductListByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const getProductListByCategory = async () => {
        try {
            const response = await productApi.getProductsByCategory(category);
            const products = response.data;
            setProductsList(products.map((product: ProductType) => {
                return <ProductItem key={product.id} product={product}/>
            }))
        } catch (error) {
            console.error('Error fetching latest products:', error);
        }
    };
  return (
    <div>
        <h2 className="mt-24 mb-5 text-xl">Simller Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {productsList}
        </div>
    </div>
  )
}
