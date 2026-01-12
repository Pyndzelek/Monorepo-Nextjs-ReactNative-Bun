import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db/client";
import * as schema from "@repo/db/schemas";
import { bearer } from "better-auth/plugins";

if (!Bun.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is required");
}

if (!Bun.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is required");
}

const authOptions = {
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000", // API URL
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,

    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: "jwe" as const,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // 10 requests per minute
  },
  plugins: [bearer()],
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"], //web app
};

// GLOBAL SINGLETON PATTERN
export const auth = (globalThis as any).auth || betterAuth(authOptions);

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).auth = auth;
}

export type Auth = typeof auth;
