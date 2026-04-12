type NodeEnv = 'development' | 'production' | 'test';

const nodeEnv = (process.env.NODE_ENV as NodeEnv) || 'development';

export const env = {
  NODE_ENV: nodeEnv,
  // You MUST write out the full process.env.KEY for Next.js to inject it
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? '',
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  NEXT_PUBLIC_API_TIMEOUT_MS: Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS) || 15000,
} as const;

export const isDev = nodeEnv === 'development';
export const isProd = nodeEnv === 'production';
export const isTest = nodeEnv === 'test';
