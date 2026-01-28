import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LoginForm } from "@/components/auth/login-form";

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
  const heroImage = PlaceHolderImages.find((img) => img.id === "login-hero");

  return (
    <div className="w-full lg:grid  lg:grid-cols-2 min-h-svh">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="font-headline text-3xl font-bold">
              {dict.login.title}
            </h1>
            <p className="text-balance text-muted-foreground">
              {dict.login.subtitle}
            </p>
          </div>
          <LoginForm dict={dict} />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width="1280"
            height="800"
            className="h-full w-full object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
