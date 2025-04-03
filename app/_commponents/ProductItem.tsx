import Link from "next/link";
import { ProductType } from "./ProductList";
import Image from "next/image";

type ProductProps = {
    product: ProductType
}

export default function ProductItem({product}: ProductProps) {
  return (
    <div className="">
        <Link href={`/product-details/${product.id}`}>
          <Image 
              src={`${process.env.NEXT_PUBLIC_URL}${product.banner.formats.thumbnail.url}`}
              alt={product.title}
              width={300}
              height={300}
              className="rounded-t-lg"
          />
          <div className="flex justify-between p-3 bg-gray-50">
            <div>
                <h2 className="text-[14px] line-clamp-1">{product.title}</h2>
                <h2 className="text-[12px] text-gray-400">{product.category}</h2>
            </div>
            <div className="price">{product.price}</div>
          </div>
        </Link>
    </div>
  )
}
