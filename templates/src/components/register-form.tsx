"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Account created successfully ✅");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-b p-6 ",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Create Account ✨
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your details below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-90 transition-all duration-200 text-white font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 text-indigo-600 hover:text-pink-600 transition"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster position="top-center" />
    </div>
  );
}
