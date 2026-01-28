'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

import type {Dictionary} from '@/lib/dictionaries';
import { toast } from 'sonner';

const settingsSchema = z.object({
  stamps: z.number().min(1).max(20),
  rateLimit: z.number().min(0),
  geofence: z.number().min(10).max(1000),
});

type SettingsFormProps = {
  dict: Dictionary;
};

export function SettingsForm({dict}: SettingsFormProps) {
 
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      stamps: 10,
      rateLimit: 24,
      geofence: 100,
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    toast('Settings Saved',{
      description: `Your new settings have been applied: ${JSON.stringify(values)}`,
    });
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.dashboard.settings.title}</CardTitle>
        <CardDescription>
          Configure your loyalty program rules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="stamps"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{dict.dashboard.settings.stampsForReward}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rateLimit"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{dict.dashboard.settings.rateLimit}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="geofence"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{dict.dashboard.settings.geofence}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{dict.dashboard.settings.save}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
