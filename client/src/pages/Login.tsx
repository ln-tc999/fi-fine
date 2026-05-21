import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";
import {
  TrendingUp, TrendingDown, Wallet, Shield,
  BrainCircuit, BarChart3, Download, ArrowRight,
} from "lucide-react";

const FEATURES = [
  { icon: BrainCircuit, title: "Multi-Agent AI", desc: "4 LLM agents simulate cashflow from Owner, Supplier, Customer, and Bank perspectives" },
  { icon: BarChart3, title: "12-Month Forecast", desc: "AI-powered cashflow projections with confidence scoring and risk alerts" },
  { icon: Shield, title: "Risk Detection", desc: "Automatic identification of financial risks — Low, Medium, High, or Critical" },
  { icon: Download, title: "Pitch Deck Export", desc: "Generate a professional 9-slide PDF pitch deck with charts and insights" },
];

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Hero ── */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
                <BrainCircuit className="h-3.5 w-3.5" />
                AI-Powered Financial Intelligence
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                SME Cashflow
                <br />
                <span className="text-primary">Forecasting</span> with
                <br />
                Multi-Agent AI
              </h1>
              <p className="text-muted-foreground text-base mt-4 max-w-md leading-relaxed">
                Small businesses struggle with cashflow uncertainty. FiSwarm uses four collaborative AI agents to simulate financial scenarios, detect risks, and generate actionable reports — no accountants required.
              </p>
            </div>

            {/* Value props */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50">
                <TrendingUp className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Revenue</div>
                  <div className="text-xs text-muted-foreground">Projected Income</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50">
                <TrendingDown className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Expenses</div>
                  <div className="text-xs text-muted-foreground">Cost Tracking</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50">
                <Wallet className="h-5 w-5 text-[oklch(0.70_0.12_55)] shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Cashflow</div>
                  <div className="text-xs text-muted-foreground">Net Balance</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50">
                <Shield className="h-5 w-5 text-[oklch(0.65_0.12_280)] shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Risk</div>
                  <div className="text-xs text-muted-foreground">AI Alerts</div>
                </div>
              </div>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="p-3 rounded-lg border border-border bg-card/30">
                    <Icon className="h-4 w-4 text-primary mb-2" />
                    <div className="text-sm font-medium">{f.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Sign in card */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-6 rounded-xl border border-border bg-card p-8 shadow-lg"
            >
              <div className="space-y-2 text-center">
                <div className="text-2xl font-bold tracking-tight text-foreground">FiSwarm</div>
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
                  className="w-full gap-2"
                  disabled={!name.trim() || loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                  {!loginMutation.isPending && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>

              {loginMutation.error && (
                <p className="text-sm text-destructive text-center">
                  {loginMutation.error.message}
                </p>
              )}

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() => setLocation("/demo")}
                >
                  Or try the Quick Demo →
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>FiSwarm — AI-Powered SME Financial Intelligence</span>
          <span>Powered by NVIDIA LLM · Multi-Agent Swarm</span>
        </div>
      </footer>
    </div>
  );
}
