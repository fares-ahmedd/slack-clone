"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // If using Next.js

function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  const handleRetry = () => {
    if (reset) {
      reset();
    } else {
      router.push("/"); // For Next.js
      // history.push("/"); // For React Router
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="h-screen bg-[#5f2659] text-white flex items-center justify-center flex-col gap-4 p-4">
      <h1 className="text-base md:text-4xl font-bold">
        Oops! Something Went Wrong
      </h1>
      <p className="text-sm  md:text-lg text-center">
        We apologize for the inconvenience. Please try again later.
      </p>
      {error && (
        <p className="text-xs  md:text-sm text-gray-300 text-center">
          Error: {error.message}
        </p>
      )}
      <div className="flex gap-4 mt-6">
        <Button onClick={handleRetry} size={"lg"} variant={"secondary"}>
          Retry
        </Button>
        <Button onClick={handleGoHome} variant={"slack"} size={"lg"}>
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default Error;
