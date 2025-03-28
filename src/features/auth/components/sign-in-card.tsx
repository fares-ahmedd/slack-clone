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
import { useAuthActions } from "@convex-dev/auth/react";
import toast from "react-hot-toast";
import { isValidEmail } from "@/lib/utils";
import Logo from "@/components/logo";
type Props = {
  setState: (state: SignInFlow) => void;
};

function SignInCard({ setState }: Props) {
  const { signIn } = useAuthActions();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleProviderSignIn = (value: "github" | "google") => {
    setLoading(true);
    signIn(value).finally(() => {
      setLoading(false);
    });
  };

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(data.email) || !data.password) {
      toast.error("Please enter a valid email and password");
      return;
    }
    setLoading(true);
    signIn("password", { ...data, flow: "signIn" })
      .then(() => {
        toast.success("Login Successful");
      })
      .catch(() => {
        toast.error("Invalid email or password");
        setData({ email: "", password: "" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card className=" h-full p-8 ">
      <CardHeader className="px-0 pt-0">
        <Logo className="mx-auto" />
        <CardTitle className="text-base md:text-3xl text-center">
          Login To Continue
        </CardTitle>
        <CardDescription className="text-center">
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 mb-0">
        <form className="space-y-2.5 my-2" onSubmit={onPasswordSignIn}>
          <Input
            disabled={loading}
            value={data.email}
            onChange={(e) => handleChange(e, "email")}
            placeholder="email"
            type="email"
            autoFocus
            required
          />
          <Input
            disabled={loading}
            value={data.password}
            onChange={(e) => handleChange(e, "password")}
            placeholder="password"
            type="password"
            required
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={loading}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-1.5">
          <Button
            disabled={loading}
            onClick={() => handleProviderSignIn("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative block"
          >
            <FcGoogle className="size-5 absolute" />
            <span className="text-xs md:text-base">Continue With Google</span>
          </Button>

          <Button
            disabled={loading}
            onClick={() => handleProviderSignIn("github")}
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
            disabled={loading}
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
