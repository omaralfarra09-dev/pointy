import Link from 'next/link';
import {CoffeeCoinLogo} from '@/components/icons/coffee-coin-logo';
import {LanguageSwitcher} from './language-switcher';
import {Button} from '../ui/button';
import type {Dictionary} from '@/lib/dictionaries';

type HeaderProps = {
  locale: string;
  dict: Dictionary;
};

export function Header({locale, dict}: HeaderProps) {
  const navItems = [
    {href: `/${locale}/stamps`, label: dict.header.stamps},
    {href: `/${locale}/scan/shop-123`, label: dict.header.scan},
    {href: `/${locale}/dashboard`, label: dict.header.dashboard},
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={`/${locale}`} className="me-4 flex items-center">
          <CoffeeCoinLogo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher locale={locale} />
          <Button asChild>
            <Link href={`/${locale}`}>{dict.header.login}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
