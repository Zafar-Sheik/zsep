import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "zsep_admin";
const MAX_AGE = 60 * 60 * 12;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-only-secret";
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSessionValue() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionValue(value?: string) {
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature) return false;
  const expected = sign(expires);
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  return Number(expires) > Math.floor(Date.now() / 1000);
}

export async function isAdmin() {
  const store = await cookies();
  return verifySessionValue(store.get(COOKIE)?.value);
}

export const adminCookie = { name: COOKIE, maxAge: MAX_AGE };
