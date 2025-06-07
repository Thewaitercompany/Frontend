import { Suspense } from "react";
import WaiterLoginForm from "@/components/waiter-table/WaiterLoginForm";

export default function WaiterLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaiterLoginForm />
    </Suspense>
  );
}
