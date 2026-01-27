import { getDictionary } from "@/lib/dictionaries";

// This line ensures the page is ALWAYS Server-Side Rendered (SSR)
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Fetching dictionary on the server per request
  const dict = await getDictionary(lang as "en" | "ar-SY");

  const amount = 15231.89;
  const formattedAmount = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <main className="p-20">
      <h1 className="text-5xl font-bold">{dict.stamps.redeem}</h1>
      <p className="text-2xl mt-4">
        {dict.scan.shopName}: {formattedAmount}
      </p>
    </main>
  );
}
