"use client";

import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { signin } from "../functions/signin";
import { useRouter } from "next/router";

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

    const status = await signin(signInData);

    if (status === "SIGNEDIN") router.push("/g");
    setError("Failed while signing in, please try again");
    return;
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="border shadow-sm rounded-lg px-6 py-4"
    >
      {error && (
        <div className="text-red-600 text-center ring-2 ring-offset-2 ring-red-600 rounded-md mb-4">
          {error}
        </div>
      )}
      <div>
        <label>Email:</label>
        <Input
          onChange={(e) =>
            setSignInData({ ...signInData, email: e.target.value })
          }
          value={signInData.email}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          onChange={(e) =>
            setSignInData({ ...signInData, password: e.target.value })
          }
          value={signInData.password}
        />
      </div>
      <Button variant="outline">Sign in</Button>
    </form>
  );
};
