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
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Logging in...");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    setLoading(false);

    if (result?.error) {
      toast.dismiss(toastId);
      toast.error("Invalid credentials ❌");
    } else {
      toast.dismiss(toastId);
      toast.success("Welcome back! 🎉");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br  p-6",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-gray-600">
            Login to continue managing your todos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                  className="rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
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

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all duration-200 text-white font-semibold shadow-md"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/" })
                      .then(() => toast.success("Logged in with Google 🎉"))
                      .catch(() => toast.error("Google login failed ❌"))
                  }
                  className="w-full rounded-xl flex items-center justify-center gap-2 border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                >
                  <FcGoogle className="w-5 h-5" />
                  Login with Google
                </Button>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm text-gray-700">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 text-indigo-600 hover:text-pink-600 transition"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster position="top-center" />
    </div>
  );
}
