import {getDictionary} from '@/lib/dictionaries';
import {SettingsForm} from '@/components/dashboard/settings-form';
import {QrCodeCard} from '@/components/dashboard/qr-code-card';

export default async function SettingsPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en'|'ar-SY');
  const shopId = 'shop-123'; // This would be fetched for the logged-in user

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {dict.dashboard.settings.title}
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <SettingsForm dict={dict} />
        </div>
        <div>
          <QrCodeCard shopId={shopId} dict={dict} />
        </div>
      </div>
    </div>
  );
}
