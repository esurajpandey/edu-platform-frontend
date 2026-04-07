type NodeEnv = "development" | "production" | "test";

const nodeEnv = (process.env.NODE_ENV as NodeEnv | undefined) ?? "development";

export const env = {
  NODE_ENV: nodeEnv,
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
} as const;

export const isDev = env.NODE_ENV === "development";
export const isProd = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
