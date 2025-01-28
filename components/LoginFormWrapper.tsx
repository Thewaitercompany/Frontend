"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import LoadingAnimations from "@/components/LoadingAnimations";
import Cookies from "js-cookie";

export default function LoginFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableId") || "1";
  const [formData, setFormData] = useState({
    mobileNumber: "",
    name: "",
    numberOfPeople: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mobileNumber || !formData.name || !formData.numberOfPeople) {
      setError("Please fill in all fields");
      return;
    }

    try {
      Cookies.set("auth", "true", { expires: 1 });
      Cookies.set("userData", JSON.stringify(formData), { expires: 1 });
      router.push(`/menu/${tableId}`);
    } catch (error) {
      console.error("Failed to save login information:", error);
      setError("Failed to save login information. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EEE6] flex flex-col">
      {isLoading ? (
        <LoadingAnimations onComplete={handleAnimationComplete} />
      ) : (
        <>
          <Navbar tableId={tableId} />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#C4B3AE] rounded-lg p-6 space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#4A3F3C]">
                  THE WAITER COMPANY
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... (rest of the form code remains unchanged) ... */}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
