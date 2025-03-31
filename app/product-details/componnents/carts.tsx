import { useRef } from "react";
import CartItem from "./cart";

export type Cart = {
  documentId: string,
  username: string,
  products: string,
  email: string
}
type Carts = {
  carts: Cart[]
};
export default function Carts({carts} : Carts) {
  const cartsRef = useRef<HTMLDivElement>(null)
  function handelClick() {
    cartsRef.current?.classList.toggle("hidden")
  }
  const cartsList = carts.map((cart: Cart) => 
    <CartItem 
  key={cart.products} 
  username={cart.username} 
  email={cart.email} 
  products={cart.products} 
  documentId={`${cart.documentId}`}
  />)
  // console.log(cart.cartId)
  return (
    <div
    className="carts relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
    aria-modal="true"
    role="dialog"
    ref={cartsRef}
>
  <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"  onClick={handelClick}>
    <span className="sr-only">Close cart</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <div className="mt-4 space-y-6">
    <ul className="space-y-4">
      {cartsList}
    </ul>

    <div className="space-y-4 text-center">
      <a
        href="#"
        className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
      >
        Checkout
      </a>
    </div>
  </div>
</div>
  )
}
