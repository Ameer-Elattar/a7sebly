import { redirect } from "next/navigation";

export default function RootPage() {
  // Automatically redirect anyone landing on "/" to "/login"
  redirect("/login");
}
