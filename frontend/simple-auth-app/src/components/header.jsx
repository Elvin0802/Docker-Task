"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/axios";

export default function Header() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    const status = localStorage.getItem("token") !== null ? "true" : "false";
    setIsAuthenticated(status === "true");
  }, [pathname]);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="mr-20">
          <Link href="/" className="font-bold text-xl">
            MyApp
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button asChild onClick={handleLogout} variant={"destructive"}>
                <Link href="/">Logout</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
