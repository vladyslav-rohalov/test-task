import "dotenv/config";

function fail(msg: string): never {
  console.error(`🔴 ENV error: ${msg}`);
  process.exit(1);
}

function envStr(name: string, def?: string): string {
  const v = (process.env[name] ?? def)?.trim();
  if (!v) fail(`${name} is required`);
  return v;
}

function envInt(name: string, def?: string): number {
  const raw = process.env[name] ?? def;
  const n = Number.parseInt(String(raw ?? ""), 10);
  if (!Number.isInteger(n) || n <= 0) {
    fail(`${name} must be a positive integer`);
  }
  return n;
}

const env = {
  NODE_ENV: process.env.NODE_ENV === "production" ? "production" : "development",
  PORT: envInt("PORT", "4000"),
  DB_USER: envStr("DB_USER", "string"),
  DB_PORT: envInt("DB_PORT", "5432"),
  DB_HOST: envStr("DB_HOST", "string"),
  DB_PASSWORD: envStr("DB_PASSWORD", "string"),
  DB_NAME: envStr("DB_NAME", "string"),
  JWT_SECRET: envStr("JWT_SECRET", "string"),
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || undefined,
};

export default env;
