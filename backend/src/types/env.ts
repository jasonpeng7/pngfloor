import { z } from "zod";

export const zEnv = z.object({
  DATABASE_URL: z.string().nonempty(),
  ENVIRONMENT: z.enum(["LOCAL", "STAGE", "PROD"]).default("LOCAL"),

  // OAuth (optional for now)
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  GOOGLE_REDIRECT_URI: z.string().url().optional(),
  FRONTEND_URL: z.string().url().optional(),
  ADMIN_EMAIL: z.string().email().optional(),

  // Cookie settings
  COOKIE_DOMAIN: z.string().optional(), // e.g. .pengflooring.com
});

export const appEnv = zEnv.parse(process.env);

export const isProd = appEnv.ENVIRONMENT === "PROD"; // for .org
export const isStage = appEnv.ENVIRONMENT === "STAGE"; // for .dev
export const isLocal = appEnv.ENVIRONMENT === "LOCAL"; // for localhost
