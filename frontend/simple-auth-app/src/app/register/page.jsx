"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authService } from "@/services/axios";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const data = await authService.register(
        formData.username,
        formData.email,
        formData.password
      );
      setResponse(data);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md space-y-6 p-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </div>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {response && (
          <Alert>
            <AlertDescription>
              <pre className="mt-2 w-full overflow-auto text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
}
