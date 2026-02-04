"use client";

import { useLanguageSwitcher } from "@/hooks/use-language-switcher";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const { switchLanguage } = useLanguageSwitcher(locale);

  return (
    <div className="w-full px-2 group-data-[collapsible=icon]:px-0">
      <Select value={locale} onValueChange={(val) => switchLanguage(val)}>
        <SelectTrigger 
          className="w-full gap-2 bg-background/50 backdrop-blur-sm border-muted-foreground/20 hover:bg-accent hover:text-accent-foreground transition-colors group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:justify-center"
        >
          <Globe className="h-4 w-4 shrink-0" />
          <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
            <SelectValue placeholder="Select Language" />
          </div>
        </SelectTrigger>
        
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar-SY">العربية</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}