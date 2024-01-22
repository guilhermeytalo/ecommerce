'use client';
import RemoveConfirmationDialog from '@/components/removeItemConfirmation';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { CartContext } from '@/context/cart';
import { formatCommonName } from '@/utils/functions';
import { PlantsProps } from '@/utils/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import EmptyCart from '../../images/emptyCart.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { toast } = useToast();
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<PlantsProps | null>(
    null
  );

  const openRemoveConfirmation = (product: PlantsProps) => {
    setSelectedProduct(product);
  };

  const closeRemoveConfirmation = () => {
    setSelectedProduct(null);
  };

  const confirmRemove = () => {
    if (selectedProduct) {
      removeFromCart(selectedProduct.id);
      closeRemoveConfirmation();
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.product.price * product.quantity,
      0
    );
  };

  const closeCart = () => {
    try {
      router.push('/', { scroll: false });
      toast({
        variant: 'default',
        title: 'Pedido finalizado com sucesso!',
      });
      clearCart();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Tente novamente mais tarde.',
      });
    }
  };

  return (
    <>
      {cart.length === 0 ? (
        <div className="bg-blueDark flex flex-col items-center justify-center text-center h-screen">
          <Card className="flex justify-center flex-col items-center">
            <CardHeader>
              <h1 className="text-2xl mb-5 font-semibold">Meu Carrinho</h1>
              <Image alt="cart" src={EmptyCart} className="mt-5 w-48 h-48" />
            </CardHeader>
            <CardContent>
              <CardTitle>Seu carrinho está vazio</CardTitle>
              <CardDescription>Adicione produtos na loja</CardDescription>
            </CardContent>
            <CardFooter>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 mt-4 rounded-lg"
                onClick={() => router.push('/')}
              >
                Voltar para a loja
              </button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div
          className={`p-10 flex flex-col h-full max-w-6xl w-full mx-auto ${
            cart.length === 0 ? 'items-center' : ''
          }`}
        >
          <h1 className="text-2xl mb-5 font-semibold text-center">
            Meu Carrinho
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row border py-2">
              <div className="w-1/5 pl-5 border border-r-1 border-l-0 border-t-0 border-b-0">
                <span>Produto</span>
              </div>
              <div className="w-1/5 pl-5 border border-r-1 border-l-0 border-t-0 border-b-0">
                <span>Preço</span>
              </div>
              <div className="w-1/5 pl-5 border border-r-1 border-l-0 border-t-0 border-b-0">
                <span>Quantidade</span>
              </div>
              <div className="w-1/5 pl-5 border border-r-1 border-l-0 border-t-0 border-b-0">
                <span>Total</span>
              </div>
              <div className="w-1/5 pl-5">
                <span>Ações</span>
              </div>
            </div>

            <div className="">
              {cart.map(({ product, quantity }) => (
                <div className="" key={product.id}>
                  <div className="flex flex-row items-center">
                    <div className="w-1/5 px-5 flex flex-col">
                      <span className="font-semibold">
                        {formatCommonName(product.common_name)}
                      </span>
                      <span className="text-sm text-slate-500">
                        {product.scientific_name &&
                          `${product.scientific_name[0]}`}
                      </span>
                    </div>

                    <div className="w-1/5 px-5">
                      <span className="text-center">{`R$ ${product.price}`}</span>
                    </div>
                    <div className="w-1/5 px-5">
                      <span className="text-center">{quantity}</span>
                    </div>
                    <div className="w-1/5 px-5">
                      <span className="text-center font-semibold text-green-500">{`R$ ${
                        product.price * quantity
                      }`}</span>
                    </div>
                    <div className="w-1/5 px-5">
                      <Button
                        variant="destructive"
                        className="gap-2"
                        onClick={() => openRemoveConfirmation(product)}
                      >
                        <TrashIcon className="w-4 h-4" />
                        Remover
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4 w-auto" />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <div className="border mt-4 flex justify-between px-5 py-2">
                <span>Total</span>
                <span className="font-semibold text-green-500 text-xl">{`R$ ${calculateTotal()}`}</span>
              </div>
              <Button
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 mt-4"
                onClick={closeCart}
              >
                Finalizar compra
              </Button>
            </div>
          </div>

          {selectedProduct && (
            <RemoveConfirmationDialog
              onConfirm={confirmRemove}
              onClose={closeRemoveConfirmation}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
