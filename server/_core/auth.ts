import { SignJWT, jwtVerify } from "jose";
import type { Request } from "express";
import * as db from "../db";
import { ENV } from "./env";

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

function getSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

export async function login(name: string) {
  let user = await db.getUserByName(name);
  if (!user) {
    const openId = crypto.randomUUID();
    await db.upsertUser({
      openId,
      name: name || null,
      lastSignedIn: new Date(),
    });
    user = await db.getUserByOpenId(openId);
  } else {
    await db.upsertUser({
      openId: user.openId,
      lastSignedIn: new Date(),
    });
    user = await db.getUserByOpenId(user.openId);
  }
  if (!user) throw new Error("Failed to create user");

  const token = await new SignJWT({
    sub: String(user.id),
    openId: user.openId,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + ONE_YEAR_MS) / 1000))
    .sign(getSecret());

  return { token, user };
}

export async function authenticateRequest(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const openId = payload.openId as string;
    if (!openId) return null;
    return (await db.getUserByOpenId(openId)) ?? null;
  } catch {
    return null;
  }
}
