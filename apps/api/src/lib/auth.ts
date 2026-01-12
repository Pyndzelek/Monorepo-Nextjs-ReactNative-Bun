import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db/client";
import * as schema from "@repo/db/schemas";
import { bearer } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  //  for React Native - bearer tokens
  plugins: [bearer()],
  trustedOrigins: [
    "http://localhost:3000", // Next.js Web
    "exp://", // React Native Expo (Dev)
    "myapp://", // React Native Deep Link
  ],
  advanced: {
    // Optional: Cross-subdomain cookies if web and api share a root domain
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});

export type Auth = typeof auth;
