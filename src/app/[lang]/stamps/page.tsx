import { getDictionary } from "@/lib/dictionaries";
import { StampCard } from "@/components/stamp-card";

export default async function SettingsPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en'|'ar-SY')

  const stampCards = [
    {
      shopName: dict.stamps.shopTitle,
      rewardThreshold: 10,
      stampsCollected: 7,
      rewardDescription: dict.stamps.rewardThreshold,
    },
    {
      shopName: "Morning Brew",
      rewardThreshold: 8,
      stampsCollected: 8,
      rewardDescription: "8 stamps for a free pastry",
    },
    {
      shopName: "The Grind",
      rewardThreshold: 5,
      stampsCollected: 2,
      rewardDescription: "5 stamps for 50% off",
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          {dict.stamps.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dict.stamps.subtitle}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {stampCards.map((card, index) => (
          <StampCard
            key={index}
            shopName={card.shopName}
            rewardThreshold={card.rewardThreshold}
            stampsCollected={card.stampsCollected}
            rewardDescription={card.rewardDescription}
            redeemLabel={dict.stamps.redeem}
          />
        ))}
      </div>
    </div>
  );
}
