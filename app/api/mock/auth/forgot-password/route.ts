import { NextRequest } from "next/server";
import { SAMPLE_USERS, delay, ok, badRequest, genOtp, genTempToken } from "../helpers";

export async function POST(req: NextRequest) {
  await delay();
  const body = await req.json().catch(() => ({}));
  const { email } = body ?? {};

  if (!email) return badRequest("Email is required");

  const exists = SAMPLE_USERS.some((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!exists) return ok({ message: "If the account exists, a reset link has been sent." });

  const otp = genOtp();
  const tempToken = genTempToken();
  const expiresAt = Date.now() + 15 * 60 * 1000;

  return ok({
    message: "Reset data generated.",
    debug: { otp, tempToken, expiresAt },
  });
}
