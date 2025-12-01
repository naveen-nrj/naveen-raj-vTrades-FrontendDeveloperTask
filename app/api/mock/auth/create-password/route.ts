import { NextRequest } from "next/server";
import { delay, badRequest, ok } from "../helpers";

export async function POST(req: NextRequest) {
  await delay();
  const body = await req.json().catch(() => ({}));
  const { token, password } = body ?? {};

  if (!token || !password) return badRequest("Token and new password are required");

  if (!String(token).startsWith("temp")) return badRequest("Invalid or expired token");

  return ok({ message: "Password updated" });
}
