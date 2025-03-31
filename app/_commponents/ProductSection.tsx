'use client'
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import productApi from '../_utils/ProductApi';



export default function ProductSection() {
    const [productList, setProductList] = useState([]); // إنشاء حالة لتخزين المنتجات
    useEffect(() => {
        getLatestProducts_();
    }, []); // إضافة مصفوفة فارغة

    const getLatestProducts_ = async () => {
        try {
            const response = await productApi.getLatestProducts();
            const porducts = response.data;
            console.log(porducts)
            setProductList(porducts); // تحديث الحالة بالبيانات
        } catch (error) {
            console.error('Error fetching latest products:', error);
        }
    };

    return (
        <div className='px-10 md:px-20'>
            <h1 className='my-4 text-xl'>Our Latest Products</h1>
            <ProductList productList={productList}/>
        </div>
    );
}