"use client";

import { useLanguageSwitcher } from "@/hooks/use-language-switcher";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const { switchLanguage, isCurrentLanguage } = useLanguageSwitcher(locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative top-0 left-0">
        <Button variant="ghost" size="icon" className="relative top-0 left-0">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["en", "ar-SY"].map((newLocale) => (
          <DropdownMenuItem
            key={newLocale}
            onClick={() => switchLanguage(newLocale)}
            disabled={isCurrentLanguage(newLocale)}
          >
            {newLocale === "en" ? "English" : "العربية"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
