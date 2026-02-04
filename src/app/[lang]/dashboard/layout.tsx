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
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CoffeeCoinLogo } from "@/components/icons/coffee-coin-logo";
import { LayoutDashboard, Settings } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar-SY");
  const side = lang === "en" ? "left" : "right";

  const navItems = [
    {
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
      <div className="flex min-h-screen w-full">
        <Sidebar
          side={side}
          collapsible="icon"
          className="border-r bg-sidebar/50 backdrop-blur-xl"
        >
          <SidebarHeader className="h-16 flex items-center justify-center border-b">
            <CoffeeCoinLogo />
          </SidebarHeader>

          <SidebarContent className="px-3 mt-4">
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className="group/item relative h-11 px-3 rounded-lg transition-all duration-200"
                  >
                    <Link href={item.href} className="flex items-center gap-4">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          {/* 1. Language Toggle placed in SidebarFooter */}
          <SidebarFooter className="p-4 border-t">
         <LanguageSwitcher locale={lang} />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col flex-1">
          {/* 2. Header with SidebarTrigger for Mobile */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-[1px] bg-border mx-2" />
            {/* You can add Breadcrumbs here */}
          </header>
          
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
