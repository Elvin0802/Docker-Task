"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardContent className="p-12 text-center space-y-8">
          {/* 404 Number */}
          <div className="space-y-4">
            <h1 className="text-9xl font-bold text-slate-200 select-none">
              404
            </h1>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">
                Page Not Found
              </h2>
              <p className="text-slate-600 text-lg max-w-md mx-auto">
                Sorry, we couldn't find the page you're looking for. It might
                have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 text-slate-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xl font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
            >
              <Link
                href="javascript:history.back()"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Need help?</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-900 underline underline-offset-4"
              >
                Contact Support
              </Link>
              <Link
                href="/sitemap"
                className="text-slate-600 hover:text-slate-900 underline underline-offset-4"
              >
                Site Map
              </Link>
              <Link
                href="/help"
                className="text-slate-600 hover:text-slate-900 underline underline-offset-4"
              >
                Help Center
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
