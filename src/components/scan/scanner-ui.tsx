'use client';

import {useState, useEffect} from 'react';
import {runFraudCheck} from '@/lib/actions';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Loader2, MapPin, ShieldCheck, ShieldX, ScanLine} from 'lucide-react';
import type {Dictionary} from '@/lib/dictionaries';
import { toast } from 'sonner';

type ScannerStatus = 'initial' | 'requesting_location' | 'checking_fraud' | 'success' | 'error_location' | 'error_fraud' | 'error_generic';

type ScannerUIProps = {
  shopId: string;
  dict: Dictionary;
};

export function ScannerUI({shopId, dict}: ScannerUIProps) {
  const [status, setStatus] = useState<ScannerStatus>('initial');
  const [fraudResult, setFraudResult] = useState<{score: number; reason: string} | null>(null);
 

  const getStatusContent = () => {
    switch (status) {
      case 'initial':
        return {icon: <ScanLine className="size-12 text-primary" />, message: dict.scan.status.initial};
      case 'requesting_location':
        return {icon: <Loader2 className="size-12 animate-spin text-primary" />, message: dict.scan.status.requesting_location};
      case 'checking_fraud':
        return {icon: <Loader2 className="size-12 animate-spin text-accent" />, message: dict.scan.status.checking_fraud};
      case 'success':
        return {icon: <ShieldCheck className="size-12 text-green-500" />, message: dict.scan.status.success};
      case 'error_location':
        return {icon: <MapPin className="size-12 text-destructive" />, message: dict.scan.status.error_location};
      case 'error_fraud':
        return {icon: <ShieldX className="size-12 text-destructive" />, message: dict.scan.status.error_fraud};
      default:
        return {icon: <ShieldX className="size-12 text-destructive" />, message: dict.scan.status.error_generic};
    }
  };

  const handleScan = () => {
    setStatus('requesting_location');
    navigator.geolocation.getCurrentPosition(
      async position => {
        setStatus('checking_fraud');
        const {latitude, longitude} = position.coords;

        try {
          const result = await runFraudCheck({latitude, longitude}, shopId);
          setFraudResult({score: result.fraudScore, reason: result.reason});
          if (result.success) {
            setStatus('success');
          } else {
            setStatus('error_fraud');
          }
        } catch (error) {
          setStatus('error_generic');
          toast.error('Error',{
            description: dict.scan.status.error_generic,
          });
        }
      },
      error => {
        console.error('Geolocation error:', error);
        setStatus('error_location');
      },
      {enableHighAccuracy: true}
    );
  };

  useEffect(() => {
    // Automatically trigger scan on page load
    handleScan();
  }, []);

  const {icon, message} = getStatusContent();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center font-headline">{dict.scan.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">{icon}</div>
        <p className="text-center text-muted-foreground">{message}</p>
        
        {(status === 'error_location' || status === 'error_fraud' || status === 'error_generic') && (
            <Button onClick={handleScan} className="w-full">
                {dict.scan.retry}
            </Button>
        )}

        {fraudResult && (status === 'success' || status === 'error_fraud') && (
          <Alert variant={status === 'success' ? 'default' : 'destructive'} className="text-start">
            <AlertTitle>{dict.scan.fraudScore.replace('{score}', fraudResult.score.toFixed(0))}</AlertTitle>
            <AlertDescription>
              {dict.scan.fraudReason.replace('{reason}', fraudResult.reason)}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
