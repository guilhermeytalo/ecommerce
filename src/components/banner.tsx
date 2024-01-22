'use client';
import BannerBackground from '@/images/plant.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const Banner = () => {
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

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1>Bem Vindo ao Espaço Vida</h1>
          <span>
            Transforme seu espaço com a beleza natural: Descubra uma variedade
            exuberante de plantas indoor, sua fonte para criar ambientes
            vibrantes e acolhedores.
          </span>
        </div>
        <div className="mt-4">
          <Button
            className="bg-greenDark hover:bg-greenDark/[0.8] rounded-tl-[20px] rounded-tr-none  rounded-br-[20px] rounded-bl-none"
            size="sm"
          >
            <Link href="#store" onClick={handleScroll}>
              Compre Agora
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <Image
          priority={true}
          src={BannerBackground}
          alt="banner-bg-img"
          width={1200}
          height={500}
        />
      </div>
    </div>
  );
};

export default Banner;
