import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export const metadata = {
  title: "Sign in | Starter Dash",
  description: "Sign in to your Starter Dash account",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center px-6 py-12">
      <div className="absolute top-6 right-6">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-lg ring-1 ring-foreground/5">
        <LoginForm />
      </div>
    </div>
  );
}
