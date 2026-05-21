import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setLocation("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) loginMutation.mutate({ name: name.trim() });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-card p-8"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-foreground">FiSwarm</h1>
          <p className="text-sm text-muted-foreground">
            Enter your name to get started
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!name.trim() || loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        {loginMutation.error && (
          <p className="text-sm text-destructive text-center">
            {loginMutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
}
