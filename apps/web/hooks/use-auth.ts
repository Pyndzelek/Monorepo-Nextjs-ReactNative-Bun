import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import type { SignInInput, SignUpInput } from "@repo/db/validation";

export function useAuth() {
  const router = useRouter();

  //  Better Auth's built-in session hook handles caching automatically
  const { data: session, isPending, error, refetch } = useSession();

  // Sign In
  const login = useMutation({
    mutationFn: async (credentials: SignInInput) => {
      const { data, error } = await signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password");
      }

      return data;
    },
    onSuccess: async () => {
      await refetch();
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Sign Up
  const register = useMutation({
    mutationFn: async (userData: SignUpInput) => {
      const { data, error } = await signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });

      if (error) {
        throw new Error(
          error.message || "Failed to create account. Please try again."
        );
      }

      return data;
    },
    onSuccess: async () => {
      await refetch(); // Refetch session after successful registration
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Sign Out
  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await signOut();

      if (error) {
        throw new Error(error.message || "Failed to sign out");
      }
    },
    onSuccess: async () => {
      await refetch(); // Refetch to clear session after logout
      toast.success("Signed out successfully");
      router.push("/sign-in");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Derived states
  const isAuthenticated = !!session?.user;
  const isLoading =
    isPending || login.isPending || register.isPending || logout.isPending;

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated,
    isLoading,
    isPending,

    error,

    login,
    register,
    logout,

    refetch,
  };
}
