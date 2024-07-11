'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';
import { toCurrency, toPercent } from '@/lib/format';
import { TTreasury } from '@/types/treasury';

export default function TreasuryTable({ items }: { items: TTreasury[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const term = searchParams.get('query');

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const filter = (term: string | null) => {
    if (!term) {
      return items;
    }

    return items.filter((i) =>
      i.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filtered = filter(term);

  return (
    <div>
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Filtrar por nome"
        className="my-10 max-w-60"
      />

      <table className="border-collapse">
        <thead className="border">
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Preço Unitário</th>
            <th className="border p-2">Retorno Anual</th>
            <th className="border p-2">Investimento Mínimo</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((i, idx) => (
            <tr key={idx}>
              <td className="border p-2 text-left">{i.name}</td>
              <td className="border p-2 text-right">
                {toCurrency(i.unitPrice)}
              </td>
              <td className="border p-2 text-right">
                {toPercent(i.annualInvestmentRate / 100)}
              </td>
              <td className="border p-2 text-right">
                {toCurrency(i.minimalInvestmentAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
