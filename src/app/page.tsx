import TreasuryTable from '@/components/home/treasury-table';
import { getBonds } from '@/data/treasure';

export default async function Home() {
  const items = await getBonds();

  return (
    <section className="container mt-10 flex flex-col items-center gap-3 text-center ">
      <TreasuryTable items={items} />
    </section>
  );
}
