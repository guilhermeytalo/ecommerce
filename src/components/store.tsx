'use client';

import { getIndoorPlants } from '@/api/products';
import { CartContext } from '@/context/cart';
import NotFoundImage from '@/images/notfoundimg.jpeg';
import { convertDateFormat, formatCommonName } from '@/utils/functions';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { FilterByOrder } from './filterByOrder';
import { Icons } from './icons';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const Store = () => {
  const { toast } = useToast();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('price');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plants = await getIndoorPlants();
        setProducts(plants);
      } catch (error) {
        console.error('Error fetching indoor plants:', error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, [toast]);

  const addNewProduct = (product: any) => {
    try {
      addToCart(product);
      toast({
        variant: 'default',
        title: 'Item adicionado ao carrinho',
        description: "Você adicionou o item ao seu carrinho.",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Tente novamente mais tarde.',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl ml-auto mr-auto">
      <h1 className="text-4xl font-bold mb-10">Loja</h1>
      <div>
        <div className="flex flex-row gap-2">
          <Input
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            type="text"
            placeholder="Filtrar plantas pelo nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterByOrder
            value={filter}
            order={order}
            onChange={(value) => setFilter(value)}
            onChangeOrder={(value) => setOrder(value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-5">
          {products
            .sort((a, b) => {
              if (filter === 'price') {
                if (order === 'asc') {
                  return a.price - b.price;
                } else {
                  return b.price - a.price;
                }
              } else if (filter === 'date') {
                if (order === 'asc') {
                  return (new Date(a.inclusion_date) as any) - (new Date(b.inclusion_date) as any);
                } else {
                  return (new Date(b.inclusion_date) as any) - (new Date(a.inclusion_date) as any);
                }
              } else {
                return 0
              }
            })
            .filter((el) => {
              if (!searchTerm || !filter) return el;
              return el.common_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
            .map((product) => (
              <div key={product.id} className='bg-white rounded shadow-sm p-10 flex flex-col min-h-[20rem] h-full'>
                <div className="flex flex-col items-center justify-between gap-2 h-[20rem] relative">
                  <div className='gap-2 flex flex-col items-center justify-center'>
                    <Image
                      src={
                        product.default_image?.original_url
                          ? product.default_image?.original_url
                          : NotFoundImage
                      }
                      alt={product.common_name}
                      className="w-16 h-16"
                      width={64}
                      height={64}
                    />
                    <h2 className="text-2xl font-bold text-center px-5">
                      {formatCommonName(product.common_name)}
                    </h2>
                    <p className='text-sm text-ellipsis truncate'>{ product.common_name === 'flowering-maple' ? product.scientific_name[0] : '-' }</p>
                  </div>

                  <div className='absolute bottom-1 flex flex-col gap-2 items-center justify-center'>
                    <p className="text-lg font-bold">R$ {product.price}</p>
                    <p className="text-lg font-bold">
                      {convertDateFormat(product.inclusion_date)}
                    </p>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded-full py-2 w-30"
                      onClick={() => addNewProduct(product)}
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
