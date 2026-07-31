"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormValues,
} from "@/validators/auth.validator";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

const router = useRouter();

  const loginUser = useAuthStore(
    (state) => state.loginUser,
  );

  const [isLoading, setIsLoading] =
    useState(false);

  const onSubmit = async (
  data: LoginFormValues,
) => {
  try {
    setIsLoading(true);

    await loginUser(data);

    toast.success("Login successful");

    router.push("/dashboard");
  } catch {
    toast.error("Invalid email or password");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Sentinel-AI</CardTitle>

        <CardDescription>
          Sign in to continue to the SOC Dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            >
            {isLoading ? "Signing In..." : "Sign In"}
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}