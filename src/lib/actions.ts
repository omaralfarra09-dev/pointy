"use server";

import { prisma } from "@/lib/server/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function runFraudCheck(
  location: { latitude: number; longitude: number },
  shopId: string,
) {
  try {
    // Mocked fraud check for dev testing
    console.log("Running mocked fraud check for:", { location, shopId });

    // Simulate some logic (or just always pass)
    const mockScore = Math.random() * 10; // Low score

    const result = {
      fraudScore: mockScore,
      reason: "Mocked fraud check passed",
    };

    if (result.fraudScore > 80) {
      return { success: false, ...result };
    }

    return { success: true, ...result };
  } catch (error) {
    console.error("Fraud check failed:", error);
    return {
      success: false,
      fraudScore: 100,
      reason: "An error occurred during the fraud check.",
    };
  }
}

export async function sendOtp(phone: string) {
  try {
    const code = "123456"; // Mocked OTP for dev
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    console.log("Sending OTP to phone:", phone);
    await prisma.otp.upsert({
      where: { phoneNumber: phone },
      update: {
        code,
        expiresAt,
      },
      create: {
        phoneNumber: phone,
        code,
        expiresAt,
      },
    });

    console.log(`Mock OTP sent to ${phone}: ${code}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, error: "Failed to send OTP" };
  }
}

export async function verifyOtp(phone: string, code: string) {
  try {
    const otpRecord = await prisma.otp.findUnique({
      where: { phoneNumber: phone },
    });

    if (!otpRecord) {
      return { success: false, error: "Invalid OTP" };
    }

    if (otpRecord.code !== code) {
      return { success: false, error: "Invalid OTP" };
    }

    if (new Date() > otpRecord.expiresAt) {
      return { success: false, error: "OTP expired" };
    }

    // OTP is valid, clean it up
    await prisma.otp.delete({
      where: { phoneNumber: phone },
    });

    // Find or create user
    const user = await prisma.user.upsert({
      where: { phoneNumber: phone },
      update: {},
      create: { phoneNumber: phone },
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "Failed to verify OTP" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user_id");
  redirect("/");
}
