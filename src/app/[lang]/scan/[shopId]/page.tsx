import { getDictionary } from "@/lib/dictionaries";
import { ScannerUI } from "@/components/scan/scanner-ui";

export default async function ScanPage({
  params,
}: {
  params: Promise<{ lang: string; shopId: string }>;
}) {
  const { lang, shopId } = await params;
  const dict = await getDictionary(lang as "en" | "ar-SY");

  // In a real app, you would fetch shop details based on shopId
  const shopName = `Shop ${shopId}`;

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          {dict.scan.shopName.replace("{shopName}", shopName)}
        </h1>
      </div>
      <ScannerUI shopId={shopId} dict={dict} />
    </div>
  );
}
