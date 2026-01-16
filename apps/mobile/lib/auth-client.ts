import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

// Use your actual backend URL
// For development with physical device, use your computer's local IP
// Example: "http://192.168.1.100:5000"
const API_URL = "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    expoClient({
      scheme: "mobile", // Must match scheme in app.json
      storagePrefix: "myapp",
      storage: SecureStore,
      cookiePrefix: "better-auth",
    }),
  ],
});

export const { useSession, signIn, signOut, signUp } = authClient;
