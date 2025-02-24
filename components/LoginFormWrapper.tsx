"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
// import LoadingAnimations from "@/components/LoadingAnimations";
import Cookies from "js-cookie";
import logo from "/public/logo.png";
import Image from "next/image"

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

  useEffect(() => {
    // This effect will run once when the component mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust this time to match the total duration of your animations

    return () => clearTimeout(timer);
  }, []);

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

    // if (isLoading) {
    //   return <LoadingAnimations onComplete={() => setIsLoading(false)} />;
    // }

  return (
    <div className="min-h-screen bg-[#F1EEE6] flex flex-col">
      <Navbar tableId={tableId} />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#B39793] rounded-lg p-6 space-y-6">
          <div className="h-16 w-36 relative flex items-center justify-center mx-auto">
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              fill
              className="object-contain"
              sizes="128px"
            />
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

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#4E3E3B] hover:bg-[#3A2F2C] text-white"
                style={{
                  width: "136px",
                  height: "31px",
                  top: "513px",
                  left: "127px",
                  gap: "0px",
                  borderRadius: "6px 6px 6px 6px",
                  opacity: "1",
                }}
              >
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
