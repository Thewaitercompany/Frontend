import { redirect } from "next/navigation";

export default function WaiterTableRoot() {
  // Redirect to login page
  redirect("/waiter-table/login");
}
