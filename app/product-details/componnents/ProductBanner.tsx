'use client'

import { useEffect, useState } from "react";
import productApi from "../../_utils/ProductApi";
import { ProductType } from "../../_commponents/ProductList"
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { AlertOctagon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import SimllerProducts from "./SimllerProducts";
import ProductSkeletioInfo from "./ProductSkeletioInfo";
import addCartItem from "@/app/_utils/post";

export default function ProductDetails({id} : {id: string}) {
  const user = useUser();
  const router = useRouter();
  const [carts, setCarts] = useState(true);
  useEffect(() => {
  },[carts])
  function addToCart() {
    console.log('add to cart')
    if(!user.isSignedIn) {
      router.push('/sign-in')
    } else {
      console.log("user");
      const cart = {
        username: `${user.user.fullName}`,
        email: user.user.emailAddresses[0].emailAddress,
        products: `${id}`
      }
      addCartItem(cart);
      setCarts(false)
    }
    console.log(user)
  }

  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    getProductById_();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProductById_ = async () => {
    try {
        const response = await productApi.getProductById(id);
        const products = response.data;
        console.log(products)
        setProduct(products[0]);
    } catch (error) {
        console.error('Error fetching latest products:', error);
    }
};
    
  if(product) {
    return (
      <>
        <div className="grid items-center sm:grid-cols-2 grid-cols-1 gap-5 mt-10 sm:gap-0 justify-around">
          <Image src={`http://localhost:1337${product?.banner.formats.thumbnail.url}`}
            width={400} 
            height={400} 
            alt={`${product?.title}`}
            className="rounded-lg"
          />
          <div className="product-info">
            <h2 className="text[20px] title">{product.title}</h2>
            <h2 className="text[15px] text-gray-400">{product.category}</h2>
            <h2 className="text[15px] title mt-5">{product.description}</h2>
            <h2 className="price text[32px] text-primary mt-3">${product.price}</h2>
            <h2 className="text[13px] text-gray-500 flex gap-2 mt-2 items-center">
              {product.instantDelivery ? <BadgeCheck className="w-5 h-5 text-green-500"/> : <AlertOctagon />}
              Eligible For Instant Delivery
            </h2>
            <button onClick={addToCart} className="flex mt-5 gap-2 p-3 text-white bg-primary hover:bg-teal-600 rounded-lg">
              <ShoppingCart />
              Add To Cart
            </button>
          </div>
        </div>
        <SimllerProducts category={product.category}/>
      </>

    )
  } else {
    return (
      <>
        <ProductSkeletioInfo />
      </>
    )
  }
}
