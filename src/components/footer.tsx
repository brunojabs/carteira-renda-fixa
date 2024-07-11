import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="text-muted-foreground w-full text-center text-sm">
      © {new Date().getFullYear()} By{' '}
      <Button variant="link" className="p-0" asChild>
        <a href="https://githuh.com/brunojabs/">Bruno Gomes</a>
      </Button>
    </footer>
  );
};
