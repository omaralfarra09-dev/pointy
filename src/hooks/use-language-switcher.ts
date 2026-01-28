"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLanguageSwitcher(currentLang: string) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = useCallback(
    (newLang: string) => {
      if (!pathname) return;

      // pathname looks like "/en/about" or "/ar-SY/about"
      const segments = pathname.split("/");

      // Replace the locale segment (at index 1)
      segments[1] = newLang;

      const newPath = segments.join("/");

      // Use router.push to change the URL without a full page reload
      router.push(newPath);
    },
    [pathname, router],
  );

  const isCurrentLanguage = useCallback(
    (lang: string) => currentLang === lang,
    [currentLang],
  );

  return {
    currentLang,
    switchLanguage,
    isCurrentLanguage,
  };
}
