"use client";

import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { signIn } from "../functions/signin";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { Label } from "../../components/label";

export type SignInData = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const status = await signIn(signInData);

    if (status === "SIGNEDIN") router.push("/g");
    setError("Failed while signing in, please try again");
    return;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Create on login in into an account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                placeholder="Enter your email"
                value={signInData.email}
                onChange={(e) =>
                  setSignInData({
                    ...signInData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                placeholder="Enter your password"
                value={signInData.password}
                onChange={(e) =>
                  setSignInData({
                    ...signInData,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center">
              <Button className="bg-black text-white" type="submit">
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
