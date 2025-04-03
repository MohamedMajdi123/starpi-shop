import { useEffect, useState } from "react";
import { Cart } from "./carts"
import productApi from "@/app/_utils/ProductApi"
import { Trash } from 'lucide-react';
import { ProductType } from "@/app/_commponents/ProductList";
import Image from "next/image";
import cartApis from "@/app/_utils/cartApis";

export default function CartItem(cart: Cart) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [showCart, setShowCart] = useState(true);
  
  useEffect(() => {
    const getProductById_ = () => {
      productApi.getProductById(cart.products)
        .then((response) => {
          setProduct(response.data[0])
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    };
    getProductById_();
  }, [cart.products])
  const deletCartByIdHandel = () => {
    console.log(cart.documentId)
    cartApis.deletCartById(`${cart.documentId}`)
      .then(() => {
        setShowCart(false);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  return showCart && (
      <li className="flex items-center justify-between gap-4 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
        <Image src={`http://localhost:1337${product?.banner.formats.thumbnail.url}` || ""}  alt={`${product?.title}`} width={100} height={100} className="size-16 rounded-sm object-cover"/>

          <h3 className="text-sm text-gray-900">{product?.title}</h3>

            <Trash size={24} color="red" className="ms-auto cursor-pointer" onClick={deletCartByIdHandel}/>
          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          </dl>
      </li>
  )
}
