"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Logo } from "@/components/shared/logo/Logo";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="space-y-6"
      onSubmit={ (event) => {
        event.preventDefault();
      } }
    >
      <div className="flex justify-center items-center pb-2">
        <Logo width={ 160 } height={ 50 } />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <InputGroup className="h-10">
          <InputGroupAddon>
            <Mail className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>
        <InputGroup className="h-10">
          <InputGroupAddon>
            <Lock className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="password"
            name="password"
            type={ showPassword ? "text" : "password" }
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={ showPassword ? "Hide password" : "Show password" }
              onClick={ () => setShowPassword((value) => !value) }
            >
              { showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              ) }
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Button type="submit" size="lg" className="group h-10 w-full">
        Sign in
        <ArrowRight
          className={ cn(
            "transition-transform group-hover:translate-x-0.5",
          ) }
        />
      </Button>
    </form>
  );
}
