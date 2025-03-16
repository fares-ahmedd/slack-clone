"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div className="text-3xl max-sm:text-red-600">
      Logged In
      <Button onClick={signOut}>sign out</Button>
    </div>
  );
}
