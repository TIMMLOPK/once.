"use client";

import { signIn } from "next-auth/react";
import Button from "../../shared/button";

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/writing" })}
      className="w-full justify-center"
    >
      Sign in
    </Button>
  );
}
