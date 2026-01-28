import {getDictionary} from '@/lib/dictionaries';
import {OverviewCards} from '@/components/dashboard/overview-cards';
import {RecentActivity} from '@/components/dashboard/recent-activity';

export default async function DashboardPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar-SY");
  
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {dict.dashboard.overview.title}
        </h1>
      </div>
      <OverviewCards dict={dict} />
      <RecentActivity dict={dict} />
    </div>
  );
}