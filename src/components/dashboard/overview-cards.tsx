import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Users, Star, ScanLine, ShieldAlert} from 'lucide-react';
import type {Dictionary} from '@/lib/dictionaries';

type OverviewCardsProps = {
  dict: Dictionary;
};

export function OverviewCards({dict}: OverviewCardsProps) {
  const stats = [
    {
      title: dict.dashboard.overview.totalStamps,
      value: '1,254',
      icon: <ScanLine className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: dict.dashboard.overview.totalRewards,
      value: '102',
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: dict.dashboard.overview.activeCustomers,
      value: '312',
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: dict.dashboard.overview.fraudAlerts,
      value: '12',
      icon: <ShieldAlert className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
