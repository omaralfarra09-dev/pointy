import { cn } from "@/lib/utils";

export function CoffeeCoinLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out",
        // Center the logo when the sidebar is collapsed
        "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Using "shrink-0" to prevent the icon from squishing
        className="size-8 shrink-0 text-primary"
      >
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
        <circle cx="10" cy="13" r="3" className="fill-accent stroke-primary" />
        <path d="M10.5 12.5h-1" className="stroke-primary-foreground" />
      </svg>

      {/* The span below will hide automatically when the sidebar is collapsed 
        via the "group-data-[collapsible=icon]:hidden" selector
      */}
      <span className="font-headline text-2xl font-bold text-foreground truncate transition-opacity group-data-[collapsible=icon]:hidden">
        CoffeeCoin
      </span>
    </div>
  );
}
