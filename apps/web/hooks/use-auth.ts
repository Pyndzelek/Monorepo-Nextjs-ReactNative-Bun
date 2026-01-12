import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import type { SignInInput, SignUpInput } from "@repo/db/validation";

export function useAuth() {
  const router = useRouter();

  const { data: session, isPending, error, refetch } = useSession();

  // Sign In Mutation
  const loginMutation = useMutation({
    mutationFn: async (data: SignInInput) => {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
    },
    onSuccess: async () => {
      await refetch();
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to sign in");
    },
  });

  // Sign Up Mutation
  const registerMutation = useMutation({
    mutationFn: async (data: SignUpInput) => {
      const { error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) throw error;
    },
    onSuccess: async () => {
      await refetch();
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create account");
    },
  });

  // Sign Out Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      router.push("/sign-in");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to sign out");
    },
  });

  return {
    session,
    isPending,
    error,
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
}
