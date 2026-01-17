import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/auth", // Hono backend
  fetchOptions: {
    credentials: "include", // Important for cookies
    onError(context) {
      // Global error handler for auth requests
      if (context.response.status === 401) {
        console.error("Unauthorized request");
      }
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
