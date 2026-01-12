"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@repo/db/validation";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export function SignUpForm() {
  const { register: registerAuth } = useAuth();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpInput) => {
    registerAuth.mutate(data);
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white border rounded-lg shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-sm text-gray-500">Enter your details below</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name field */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            {...form.register("name")}
            placeholder="John Doe"
            disabled={registerAuth.isPending}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            {...form.register("email")}
            type="email"
            placeholder="m@example.com"
            disabled={registerAuth.isPending}
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
            disabled={registerAuth.isPending}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
          />
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Error message */}
        {registerAuth.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {registerAuth.error.message || "Failed to create account"}
          </div>
        )}

        <button
          type="submit"
          disabled={registerAuth.isPending}
          className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registerAuth.isPending ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="underline font-medium hover:text-gray-900"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
