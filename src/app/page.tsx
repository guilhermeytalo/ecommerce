import Banner from '@/components/banner';
import Header from '@/components/header';
import Store from '@/components/store';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 bg-ligthWhite">
      <Header />
      <Banner />
      <section id="store">
        <Store />
      </section>
      <Toaster />
    </main>
  );
}
