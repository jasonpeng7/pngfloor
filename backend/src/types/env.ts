import { z } from "zod";

export const zEnv = z.object({
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z.coerce.number().gt(0).default(5430),
  POSTGRES_SSL: z
    .enum(["false", "require", "allow", "prefer", "verify-full"])
    .default("false"),
  ENVIRONMENT: z.enum(["LOCAL", "STAGE", "PROD"]).default("LOCAL"),
});

export const appEnv = zEnv.parse(Bun.env);

export const isProd = appEnv.ENVIRONMENT === "PROD"; // for .org
export const isStage = appEnv.ENVIRONMENT === "STAGE"; // for .dev
export const isLocal = appEnv.ENVIRONMENT === "LOCAL"; // for localhost
