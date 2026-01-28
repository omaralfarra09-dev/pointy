"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { sendOtp, verifyOtp } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number is too short"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "Code must be 6 digits"),
});

type LoginFormProps = {
  dict: Dictionary;
};

export function LoginForm({ dict }: LoginFormProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    setIsPhoneLoading(true);
    setPhone(values.phone);

    try {
      const res = await sendOtp(values.phone);
      if (res.success) {
        setStep("otp");
        toast("OTP Sent",{
          description: "For dev testing, use code: 123456",
        });
        router.refresh();
      } else {
        toast.error("Error",{
          
          description: res.error || "Failed to send OTP",
        });
      }
    } catch (e) {
      toast.error("Error",{
        
        description: "Something went wrong",
      });
    } finally {
      setIsPhoneLoading(false);
    }
  };

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    setIsOtpLoading(true);
    try {
      const res = await verifyOtp(phone, values.otp);
      if (res.success) {
        toast.success('Success',{
          
          description: "Logged in successfully!",
        });
        router.push("dashboard");
        router.refresh();
      } else {
        toast.error("Error",{
          description: res.error || "Invalid OTP",
        });
      }
    } catch (e) {
      toast.error("Error",{
        description: "Something went wrong",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  if (step === "otp") {
    return (
      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onOtpSubmit)}
          className="grid gap-4"
        >
          <FormField
            key="otpForm"
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.login.otpLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.login.otpPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isOtpLoading}>
            {isOtpLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
            {isOtpLoading ? dict.login.verifying : dict.login.verify}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...phoneForm}>
      <form
        onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
        className="grid gap-4"
      >
        <FormField
          key="phoneForm"
          control={phoneForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.login.phoneLabel}</FormLabel>
              <FormControl>
                <Input placeholder={dict.login.phonePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPhoneLoading}>
          {isPhoneLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
          {isPhoneLoading ? dict.login.sending : dict.login.sendCode}
        </Button>
      </form>
    </Form>
  );
}
