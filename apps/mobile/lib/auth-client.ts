import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

//This is globally defined better auth client - it basicly does all the magic of authentication

// Use your actual backend URL(with computer's ip adress) here if you want to test an app on a physical device
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

export const { useSession } = authClient;
