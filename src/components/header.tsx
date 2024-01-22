'use client';
import { CartContext } from '@/context/cart';
import { ShoppingBasket, Sprout } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { Button } from './ui/button';

const Header = () => {
  const { cart } = useContext(CartContext);
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, '');
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-start">
        <h1 className="flex items-center">
          <Sprout width={34} height={34} color="green" className="mr-2" />
          Espaço Vida
        </h1>
      </div>
      <div className="flex flex-end">
        <nav className="flex items-center space-x-4 mx-6">
          <a className="hover:text-primary" href="/">
            Home
          </a>
          <a
            className="hover:text-primary"
            href="#store"
            onClick={handleScroll}
          >
            Loja
          </a>
        </nav>
        <div>
          <Link href="/checkout">
            <Button variant="outline">
              <ShoppingBasket />
              {totalQuantity > 0 && (
                <span className="absolute top-[90px] right-[90px] bg-red-500 text-white rounded-full px-2">
                  {totalQuantity}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
