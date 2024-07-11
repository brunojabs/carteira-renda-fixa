export function toCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function toPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
  }).format(value);
}
