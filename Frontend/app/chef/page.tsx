import { redirect } from "next/navigation";

export default function ChefRoot() {
  // Redirect to login page
  redirect("/chef/login");
}
