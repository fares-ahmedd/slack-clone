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
import { isPasswordValid, isValidEmail } from "@/lib/utils";
import toast from "react-hot-toast";

type Props = {
  setState: (state: SignInFlow) => void;
};

function SignUpCard({ setState }: Props) {
  const { signIn } = useAuthActions();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid(data.password)) {
      toast.error(
        "Password must contain at least 6 characters, including uppercase, lowercase, and numbers"
      );
      return;
    }
    if (
      !isValidEmail(data.email) ||
      !data.password ||
      data.password !== data.confirmPassword
    ) {
      toast.error("Please enter a valid data and make sure passwords match");
      return;
    }
    setLoading(true);
    signIn("password", { ...data, flow: "signUp" })
      .catch(() => {
        toast.error("Something Went Wrong !");
        setData({ email: "", password: "", confirmPassword: "" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleProvideSignUp = (value: "github" | "google") => {
    setLoading(true);
    signIn(value).finally(() => {
      setLoading(false);
    });
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-base md:text-3xl">
          Sign Up To Continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 mb-0">
        <form className="space-y-2.5 my-2" onSubmit={onPasswordSignUp}>
          <Input
            disabled={loading}
            value={data.email}
            onChange={(e) => handleChange(e, "email")}
            placeholder="email"
            type="email"
            required
          />{" "}
          <Input
            disabled={loading}
            value={data.password}
            onChange={(e) => handleChange(e, "password")}
            placeholder="password"
            type="password"
            required
          />
          <Input
            disabled={loading}
            value={data.confirmPassword}
            onChange={(e) => handleChange(e, "confirmPassword")}
            placeholder="confirm the password"
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
            onClick={() => handleProvideSignUp("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative block"
          >
            <FcGoogle className="size-5 absolute" />
            <span className="text-xs md:text-base">Continue With Google</span>
          </Button>

          <Button
            disabled={loading}
            onClick={() => handleProvideSignUp("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative block "
          >
            <FaGithub className="size-5 absolute" />
            <span className="text-xs md:text-base"> Continue With Github</span>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Already have an account ?{" "}
          <button
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("SignIn")}
          >
            Sign In
          </button>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
