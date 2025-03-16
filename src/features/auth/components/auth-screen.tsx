"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

function AuthScreen() {
  const [state, setState] = useState<SignInFlow>("SignIn");
  return (
    <div className="h-screen flex items-center justify-center bg-[#5f2659]">
      <div className="md:h-auto md:w-[420px]">
        {state === "SignIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
}

export default AuthScreen;
