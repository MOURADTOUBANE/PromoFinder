import Hero from '@/component/hero';
import Features from '@/component/features';
export const metadata = {
  title: 'DealHunter',
  description: 'best deals in one pleace.',
};

export default function Home() {

  return (
  <>
  <Hero />
  <Features />
 
  </>
  );
}
