'use client';
import { PlantsProps } from '@/utils/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

type CartContextState = {
  cart: { product: PlantsProps; quantity: number }[];
  addToCart: (product: PlantsProps) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const defaultCartContextState: CartContextState = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

export const CartContext = createContext<CartContextState>(
  defaultCartContextState
);

export const CartProvider = ({ children }: CartProviderProps) => {

  const [cart, setCart] = useState<
    { product: PlantsProps; quantity: number }[]
  >(() => {
    const savedCart =
      typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
    return savedCart ? JSON?.parse(savedCart) : [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: PlantsProps) => {
    setCart((currentCart) => {
      const productInCart = currentCart.find(
        (item) => item.product.id === product.id
      );
      if (productInCart) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) =>
      currentCart.reduce((newCart, item) => {
        if (item.product.id === productId) {
          if (item.quantity > 1) {
            newCart.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newCart.push(item);
        }
        return newCart;
      }, [] as { product: PlantsProps; quantity: number }[])
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue: CartContextState = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
