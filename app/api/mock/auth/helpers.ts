import { NextResponse } from "next/server";

export type SampleUser = {
  email: string;
  password: string;
  name?: string;
};
// mock data for users, can add more for testing

export const SAMPLE_USERS: SampleUser[] = [
  { email: "navinash@workhive.com", password: "123456", name: "Navinash" },
    { email: "hello@gmail.com", password: "123456", name: "Hello" },
  { email: "companyadmin@gmail.com", password: "Password123", name: "Company Admin" },
];

export async function delay(ms = 450) {
  return new Promise((res) => setTimeout(res, ms));
}

export function ok(data: any = {}) {
  return NextResponse.json({ ok: true, ...data }, { status: 200 });
}
export function created(data: any = {}) {
  return NextResponse.json({ ok: true, ...data }, { status: 201 });
}
export function badRequest(message = "Bad Request") {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}
export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ ok: false, error: message }, { status: 401 });
}
export function notFound(message = "Not found") {
  return NextResponse.json({ ok: false, error: message }, { status: 404 });
}

export function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
export function genTempToken() {
  return "temp_" + Math.random().toString(36).slice(2, 12);
}
export function genSessionToken() {
  return "sess_" + Math.random().toString(36).slice(2, 12);
}
