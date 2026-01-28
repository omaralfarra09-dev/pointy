import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { CoffeeCoinLogo } from "@/components/icons/coffee-coin-logo";
import { LayoutDashboard, Settings } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 1. Update type to Promise and match the key 'lang' from your RootLayout
  params: Promise<{ lang: string }>;
}) {
  // 2. Await the params before using them
  const { lang } = await params;

  // Cast lang to Locale if your dictionary expects strict typing
  const dict = await getDictionary(lang as "en" | "ar-SY");
  const side = lang === "en" ? "left" : "right";

  const navItems = [
    {
      // 3. Use 'lang' for the URL construction
      href: `/${lang}/dashboard`,
      label: dict.dashboard.nav.overview,
      icon: <LayoutDashboard />,
    },
    {
      href: `/${lang}/dashboard/settings`,
      label: dict.dashboard.nav.settings,
      icon: <Settings />,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar side={side}>
          <SidebarHeader>
            <CoffeeCoinLogo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton className="w-full justify-start">
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <LanguageSwitcher locale={lang} />
        <SidebarInset className="p-4 sm:p-6 lg:p-8 min-w-full">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
