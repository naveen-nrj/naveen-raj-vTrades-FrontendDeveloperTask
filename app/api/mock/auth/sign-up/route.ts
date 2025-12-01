import { NextRequest } from "next/server";
import { SAMPLE_USERS, delay, created, badRequest } from "../helpers";

export async function POST(req: NextRequest) {
  await delay();
  const body = await req.json().catch(() => ({}));
  const { email, password } = body ?? {};

  if (!email || !password) return badRequest("Email and password required");

  const exists = SAMPLE_USERS.some((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (exists) return badRequest("User already exists (mock)");

  return created({
    message: "User created (mock). Verification email would be sent in real app.",
    user: { email, createdAt: new Date().toISOString() },
  });
}
