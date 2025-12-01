import { redirect } from "next/navigation";

//Redirects to sign in page on load

export default function Home() {
  redirect("/signin");
}