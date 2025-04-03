'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { useEffect, useState, Suspense } from 'react';
import { usePathname} from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import cartApis from '../_utils/cartApis';
import Carts from '../product-details/componnents/carts';

export default function Header() {
  const [cartsShow, setCartsShow] = useState(false); 
  const pathname = usePathname();
  const [header, setHeader] = useState(false);
  const [carts, setCarts] = useState([]);
  const user = useUser();
  const email = user?.user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    getCartByEmail_();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handelClick = () => {
    const cart = document.querySelector('.carts');
    if (cart) {
      cart.classList.toggle('hidden', cartsShow);
    }
    setCartsShow(!cartsShow);
  };

  const getCartByEmail_ = async () => {
      try {
          const response = await cartApis.getCartByEmail(`${email}`);
          setCarts(response.data);
      } catch (error) {
          console.error('Error fetching latest products:', error);
      }
  };

  useEffect(() => {
    const url = `${pathname}`;
    setHeader(!(url.includes('sign-up') || url.includes('sign-in')));
  }, [pathname]);

  return header && (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!user.isSignedIn ? 
                <>
                  <Link className="logo block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500" href="/sign-in">Login</Link>
                  <Link className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block" href="/sign-up">Register</Link>
                </>
              : <>
                <h2 className='flex items-center gap-2 cursor-pointer' onClick={handelClick}><ShoppingCart />({carts.length})</h2>
                <UserButton />
                {cartsShow && <Suspense fallback={<div>Loading...</div>}><Carts carts={carts} /></Suspense>}
              </>
              }
            </div>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}