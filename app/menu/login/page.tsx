"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import LoadingAnimations from "@/components/LoadingAnimations";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableId, setTableId] = useState("1");
  const [formData, setFormData] = useState({
    mobileNumber: "",
    name: "",
    numberOfPeople: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tableIdParam = searchParams.get("tableId");
    if (tableIdParam && tableIdParam !== "login") {
      setTableId(tableIdParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mobileNumber || !formData.name || !formData.numberOfPeople) {
      setError("Please fill in all fields");
      return;
    }

    Cookies.set("auth", "true", { expires: 1 });
    Cookies.set("userData", JSON.stringify(formData), { expires: 1 });

    router.push(`/menu/${tableId}`);
  };

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingAnimations onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#F1EEE6] flex flex-col">
      <Navbar tableId={tableId} />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#C4B3AE] rounded-lg p-6 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#4A3F3C]">
              THE WAITER COMPANY
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-[#4A3F3C]">
                Enter Mobile Number
              </label>
              <div className="relative">
                <Input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  className="pl-8 bg-white border-none"
                  placeholder="+91"
                  required
                />
                <Phone className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#4A3F3C]">Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white border-none"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#4A3F3C]">Number of people</label>
              <Input
                type="number"
                value={formData.numberOfPeople}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfPeople: e.target.value })
                }
                className="bg-white border-none"
                placeholder="Enter Number of people"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4A3F3C] hover:bg-[#3A2F2C] text-white"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
