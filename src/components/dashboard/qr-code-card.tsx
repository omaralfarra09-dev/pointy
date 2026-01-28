import Image from 'next/image';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Download} from 'lucide-react';
import type {Dictionary} from '@/lib/dictionaries';

type QrCodeCardProps = {
  shopId: string;
  dict: Dictionary;
};

export function QrCodeCard({shopId, dict}: QrCodeCardProps) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${process.env.NEXT_PUBLIC_BASE_URL}/scan/${shopId}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.dashboard.settings.qrCodeTitle}</CardTitle>
        <CardDescription>{dict.dashboard.settings.qrCodeDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Image src={qrCodeUrl} alt={`QR Code for ${shopId}`} width={200} height={200} />
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Download className="me-2 h-4 w-4" />
          {dict.dashboard.settings.download}
        </Button>
      </CardFooter>
    </Card>
  );
}
