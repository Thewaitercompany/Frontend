import { Suspense } from "react";
import ChefLoginForm from "@/components/chef/ChefLoginForm";

export default function ChefLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChefLoginForm />
    </Suspense>
  );
}
