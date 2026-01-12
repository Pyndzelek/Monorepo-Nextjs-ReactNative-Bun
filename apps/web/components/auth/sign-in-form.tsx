"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInInput } from "@repo/db/validation";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export function SignInForm() {
  const { login } = useAuth();

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInInput) => {
    login.mutate(data);
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white border rounded-lg shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-500">Sign in to your account</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email field */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            {...form.register("email")}
            type="email"
            placeholder="m@example.com"
            disabled={login.isPending}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            {...form.register("password")}
            type="password"
            placeholder="••••••••"
            disabled={login.isPending}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
          />
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Error message */}
        {login.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {login.error.message || "Invalid credentials"}
          </div>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {login.isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="underline font-medium hover:text-gray-900"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
