import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import type {Dictionary} from '@/lib/dictionaries';

type RecentActivityProps = {
  dict: Dictionary;
};

const activities = [
  {id: 'user-avatar-1', user: 'Olivia Martin', time: '5 minutes ago', status: 'Success'},
  {id: 'user-avatar-2', user: 'Liam Johnson', time: '15 minutes ago', status: 'Success'},
  {id: 'user-avatar-3', user: 'Noah Williams', time: '1 hour ago', status: 'Blocked'},
  {id: 'user-avatar-4', user: 'Emma Brown', time: '2 hours ago', status: 'Success'},
];

export function RecentActivity({dict}: RecentActivityProps) {
  const avatarImages = PlaceHolderImages.filter(img => img.id.includes('user-avatar'));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.dashboard.overview.recentActivity}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.dashboard.overview.user}</TableHead>
              <TableHead className="text-end">{dict.dashboard.overview.timestamp}</TableHead>
              <TableHead className="text-end">{dict.dashboard.overview.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map(activity => {
              const avatar = avatarImages.find(img => img.id === activity.id);
              return (
                <TableRow key={activity.user}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {avatar && (
                        <Image
                          src={avatar.imageUrl}
                          alt={avatar.description}
                          width={40}
                          height={40}
                          className="rounded-full"
                          data-ai-hint={avatar.imageHint}
                        />
                      )}
                      <span className="font-medium">{activity.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-end text-muted-foreground">{activity.time}</TableCell>
                  <TableCell className="text-end">
                    <Badge variant={activity.status === 'Success' ? 'secondary' : 'destructive'}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
