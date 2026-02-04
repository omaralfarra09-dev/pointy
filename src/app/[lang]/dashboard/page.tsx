import { Suspense } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Next.js Best Practice: Define dynamic params for static generation.
 */
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar-SY" }];
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar-SY");

  return (
    /* Updated 'w-full' and removed 'max-w-7xl' to ensure it uses 100% width.
       Added 'px-4 md:px-10' for edge-to-edge breathing room on laptops.
    */
    <main className="flex flex-col gap-6 py-6 px-4 md:px-10 lg:gap-8 w-full">
      <header className="flex flex-col gap-2">
        <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {dict.dashboard.overview.title}
        </h1>
        
      </header>

      <section className="flex flex-col gap-8 w-full">
        {/* Streaming boundaries for non-blocking UI */}
        <Suspense fallback={<OverviewCardsSkeleton />}>
          <OverviewCards dict={dict} />
        </Suspense>

        <Suspense
          fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
        >
          <RecentActivity dict={dict} />
        </Suspense>
      </section>
    </main>
  );
}

/**
 * Loading Skeleton to maintain layout stability
 */
function OverviewCardsSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}
