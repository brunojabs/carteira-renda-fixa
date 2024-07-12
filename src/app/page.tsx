import TreasuryList from '@/components/home/treasury-list';
import { getBonds } from '@/data/treasure';

export default async function Home() {
  const items = await getBonds();

  return (
    <section className="container">
      <TreasuryList items={items.filter((i) => i.unitPrice > 0)} />
    </section>
  );
}
