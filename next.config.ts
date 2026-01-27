import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 i18n: {
    // 'ar-SY' is the standard code for Arabic (Syria)
    // 'en' is English
    locales: ['ar-SY', 'en'],
    
    // Set the default locale (change to 'en' if you want English default)
    defaultLocale: 'en',
    
    // Optional: Disable automatic locale detection if you want strictly manual switching
    // localeDetection: false, 
  },
};

export default nextConfig;
