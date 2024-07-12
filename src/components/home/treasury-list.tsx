'use client';

import { Info } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toCurrency, toPercent } from '@/lib/format';
import { TTreasury } from '@/types/treasury';

const formatZero = (value: number, formatter: (a: number) => string): string =>
  value === 0 ? '-' : formatter(value);

export default function TreasuryList({ items }: { items: TTreasury[] }) {
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

      <div className="mx-auto grid max-w-96 grid-cols-1 gap-5 sm:max-w-full sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((i, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-xl">{i.name} </CardTitle>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-5" />
                      <span className="sr-only">Mais</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-[35ch]">{i.description}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Preço unitário</span>
                  <span>{formatZero(i.unitPrice, toCurrency)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Retorno anual</span>
                  <span>
                    {formatZero(i.annualInvestmentRate / 100, toPercent)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Investimento mínimo
                  </span>
                  <span>
                    {formatZero(i.minimalInvestmentAmount, toCurrency)}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
