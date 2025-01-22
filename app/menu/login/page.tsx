import { Suspense } from "react";
import LoginFormWrapper from "@/components/LoginFormWrapper";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1EEE6] flex items-center justify-center">
          <div className="text-center text-[#4A3F3C]">Loading...</div>
        </div>
      }
    >
      <LoginFormWrapper />
    </Suspense>
  );
}
