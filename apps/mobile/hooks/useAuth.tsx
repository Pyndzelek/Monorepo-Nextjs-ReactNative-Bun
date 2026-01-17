import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { signUpSchema, signInSchema } from "@repo/db/validation";
import type { SignUpInput, SignInInput } from "@repo/db/validation";

interface AuthError {
  field?: keyof SignUpInput | keyof SignInInput;
  message: string;
}

export default function useAuth() {
  //  session directly from better-auth. It handles caching/persistence.
  const { data: session, isPending: isSessionLoading } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError[]>([]);

  const clearErrors = () => setErrors([]);

  const signIn = async (data: SignInInput): Promise<boolean> => {
    if (isLoading) return false;
    setIsLoading(true);
    setErrors([]);

    try {
      const validation = signInSchema.safeParse(data);
      if (!validation.success) {
        setErrors(
          validation.error.issues.map((err) => ({
            field: err.path[0] as keyof SignInInput,
            message: err.message,
          }))
        );
        return false;
      }

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setErrors([{ message: result.error.message || "Invalid credentials" }]);
        return false;
      }

      return true;
    } catch (err) {
      setErrors([{ message: "Network error. Please try again." }]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpInput): Promise<boolean> => {
    if (isLoading) return false;
    setIsLoading(true);
    setErrors([]);

    try {
      const validation = signUpSchema.safeParse(data);
      if (!validation.success) {
        setErrors(
          validation.error.issues.map((err) => ({
            field: err.path[0] as keyof SignUpInput,
            message: err.message,
          }))
        );
        return false;
      }

      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.error) {
        setErrors([{ message: result.error.message || "Sign up failed" }]);
        return false;
      }

      return true;
    } catch (err) {
      setErrors([{ message: "Network error. Please try again." }]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    user: session?.user,
    isAuthenticated: !!session,
    isLoading,
    isSessionLoading,
    errors,
    signIn,
    signUp,
    signOut,
    clearErrors,
  };
}
