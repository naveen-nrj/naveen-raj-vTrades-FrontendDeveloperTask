import { NextRequest } from "next/server";
import { SAMPLE_USERS, delay, ok, unauthorized, badRequest, genSessionToken } from "../helpers";

export async function POST(req: NextRequest) {
  await delay();
  const body = await req.json().catch(() => ({}));
  const { email, password } = body ?? {};

  if (!email || !password) return badRequest("Email and password are required");

  const user = SAMPLE_USERS.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || user.password !== password) return unauthorized("Invalid credentials");

  return ok({
    message: "Signed in (mock)",
    session: { user: { email: user.email, name: user.name }, token: genSessionToken() },
  });
}
