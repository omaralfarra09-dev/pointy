import { Coffee } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type StampCardProps = {
  shopName: string;
  rewardThreshold: number;
  stampsCollected: number;
  rewardDescription: string;
  redeemLabel: string;
};

export function StampCard({
  shopName,
  rewardThreshold,
  stampsCollected,
  rewardDescription,
  redeemLabel,
}: StampCardProps) {
  const isRewardReady = stampsCollected >= rewardThreshold;
  const progress = (stampsCollected / rewardThreshold) * 100;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline">{shopName}</CardTitle>
        <CardDescription>{rewardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: rewardThreshold }).map((_, index) => (
            <div
              key={index}
              className={`flex aspect-square items-center justify-center rounded-full transition-all ${
                index < stampsCollected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Coffee
                className={`size-6 ${
                  index < stampsCollected
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {isRewardReady ? (
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {redeemLabel}
          </Button>
        ) : (
          <>
            <div className="w-full text-center text-sm text-muted-foreground">
              {stampsCollected} / {rewardThreshold}
            </div>
            <Progress value={progress} className="w-full" />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
