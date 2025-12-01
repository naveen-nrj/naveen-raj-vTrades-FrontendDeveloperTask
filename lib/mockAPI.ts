export type SignInPayload = { email: string; password: string };
export type SignUpPayload = { email: string; password: string };
export type ForgotPasswordPayload = { email: string };
export type CreatePasswordPayload = { token: string; password: string };

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

// ---- Response shapes (based on the mock endpoints added) ----
export type SignInResponse = {
  message: string;
  session: { user: { email: string; name?: string }; token: string };
};

export type SignUpResponse = {
  message: string;
  user?: { email: string; createdAt?: string };
};

export type ForgotPasswordResponse = {
  message: string;
  debug?: { otp?: string; tempToken?: string; expiresAt?: number };
};

export type CreatePasswordResponse = {
  message: string;
};

// ---- internal helper ----
async function postJson<TRequest, TResponse>(
  path: string,
  body: TRequest
): Promise<ApiResult<TResponse>> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Try to parse JSON (mock endpoints return JSON)
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      // If server sent JSON with an error message, prefer that
      const errMsg =
        (json && (json.error || json.message)) ||
        `Request failed with status ${res.status}`;
      return { ok: false, error: String(errMsg) };
    }

    // Success
    return { ok: true, data: json as TResponse };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "Network error" };
  }
}

// ---- exported helpers ----

/**
 * Sign in with email + password
 */
export async function signIn(
  payload: SignInPayload
): Promise<ApiResult<SignInResponse>> {
  return postJson<SignInPayload, SignInResponse>("/api/mock/auth/sign-in", payload);
}

/**
 * Sign up (create new user) - mock only
 */
export async function signUp(
  payload: SignUpPayload
): Promise<ApiResult<SignUpResponse>> {
  return postJson<SignUpPayload, SignUpResponse>("/api/mock/auth/sign-up", payload);
}

/**
 * Request forgot password (returns debug OTP + tempToken in mock)
 */
export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<ApiResult<ForgotPasswordResponse>> {
  return postJson<ForgotPasswordPayload, ForgotPasswordResponse>(
    "/api/mock/auth/forgot-password",
    payload
  );
}

/**
 * Create a new password using the temporary token
 */
export async function createPassword(
  payload: CreatePasswordPayload
): Promise<ApiResult<CreatePasswordResponse>> {
  return postJson<CreatePasswordPayload, CreatePasswordResponse>(
    "/api/mock/auth/create-password",
    payload
  );
}
