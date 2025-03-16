import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";

type Props = {
  setState: (state: SignInFlow) => void;
};

function SignInCard({ setState }: Props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <Card className=" h-full p-8 ">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-base md:text-3xl">
          Login To Continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 mb-0">
        <form className="space-y-1.5">
          <Input
            disabled={false}
            value={data.email}
            onChange={(e) => handleChange(e, "email")}
            placeholder="email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={data.password}
            onChange={(e) => handleChange(e, "password")}
            placeholder="password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size={"lg"} disabled={false}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-1.5">
          <Button
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
            className="w-full relative block"
          >
            <FcGoogle className="size-5 absolute" />
            <span className="text-xs md:text-base">Continue With Google</span>
          </Button>

          <Button
            disabled={false}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
            className="w-full relative block "
          >
            <FaGithub className="size-5 absolute" />
            <span className="text-xs md:text-base"> Continue With Github</span>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Don&apos;t have an account ?{" "}
          <button
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("SignUp")}
          >
            Sign Up
          </button>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
