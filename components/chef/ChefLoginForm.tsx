"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import logo from "/public/logo.png";

export default function ChefLoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    restaurantId: "", // This would typically come from a URL parameter or restaurant selection
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // In production, this would be an API call to your backend
      // const response = await fetch("https://backend-axu7.onrender.com/chef/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });

      // For now, use mock data
      // const result = await response.json();

      // Mock authentication for development
      const mockRestaurantId = "123456";
      const mockChefId = "C001";

      // Store auth data
      Cookies.set("chefAuth", "true", { expires: 1 });
      Cookies.set(
        "chefData",
        JSON.stringify({
          restaurantId: mockRestaurantId,
          chefId: mockChefId,
          email: formData.email,
        }),
        { expires: 1 }
      );

      // Redirect to dashboard with the restaurant ID
      router.push(`/chef/${mockRestaurantId}/dashboard`);
    } catch (error: any) {
      setError(error.message || "Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EEE6] flex flex-col">
      <div className="bg-[#ffffff] px-4 py-4">
        <div className="flex items-center">
          <div className="h-8 w-24 relative">
            <Image
              src={logo}
              alt="The Waiter Company"
              fill
              className="object-contain object-left"
              sizes="96px"
            />
          </div>
          <span className="text-gray-900 text-base ml-2 flex items-center italic gap-1">
            <span className="text-xl">×</span> Kitchen Portal
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#B39793] rounded-lg p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-white mb-2">Chef Login</h1>
            <p className="text-white/80 text-sm">
              Log in to access your kitchen dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-100 bg-red-500/40 p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-white">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 bg-white border-none"
                  placeholder="your.email@example.com"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white">Password</label>
              <div className="relative">
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 bg-white border-none"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="bg-[#4E3E3B] hover:bg-[#3A2F2C] text-white w-full py-6"
                disabled={isLoading}
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
