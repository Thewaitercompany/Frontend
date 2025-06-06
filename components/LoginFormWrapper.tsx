"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Image from "next/image";

export default function LoginFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableId") || "1"; // Get tableId from URL

  const [formData, setFormData] = useState({
    phonenumber: "",
    name: "",
    headcount: "",
    tableNumber: tableId, // Include table number in form data
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    if (!formData.phonenumber || !formData.name || !formData.headcount || !formData.tableNumber) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("https://qr-customer-sj9m.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
  
      // Extract tableNumber and phonenumber from response
      const { phonenumber, tableNumber } = result.data;
  
      // Store user data securely
      Cookies.set("auth", "true", { expires: 1 });
      Cookies.set("userData", JSON.stringify(result.data), { expires: 1 });
      localStorage.setItem("phonenumber", phonenumber);
      localStorage.setItem("tableNumber", tableNumber);
  
      // Redirect to menu with correct tableNumber
      router.push(`/menu/${tableNumber}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-[#F1EEE6] flex flex-col">
      <Navbar tableId={tableId} />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#B39793] rounded-lg p-6 space-y-6">
          <div className="h-16 w-36 relative flex items-center justify-center mx-auto">
            <Image
              src="/logo.png"
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
                  value={formData.phonenumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phonenumber: e.target.value })
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
                value={formData.headcount}
                onChange={(e) =>
                  setFormData({ ...formData, headcount: e.target.value })
                }
                className="bg-white border-none"
                placeholder="Enter Number of people"
                required
              />
            </div>

            {/* Hidden input field to ensure tableNumber is included in the request */}
            <input type="hidden" value={formData.tableNumber} />

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
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
