"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setEmail("");
    setIsLoading(false);

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="py-16 md:py-20 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-foreground/70 mb-8">
            Subscribe to our newsletter and get the latest articles delivered
            directly to your inbox. No spam, just great content.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || isSuccess}
                className="sm:w-auto"
              >
                {isLoading ? "Subscribing..." : isSuccess ? "Subscribed!" : "Subscribe"}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                <span>Thanks for subscribing! Check your email for confirmation.</span>
              </div>
            )}
          </form>

          {/* Privacy Notice */}
          <p className="text-xs text-foreground/50 mt-6">
            We respect your privacy. Unsubscribe at any time.{" "}
            <a href="/privacy" className="hover:text-foreground/70 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
