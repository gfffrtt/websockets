import { SignInData } from "../components/sign-in";

export type SignInStatus = "SIGNEDIN" | "FAILED";

export const signin = async (signInData: SignInData): Promise<SignInStatus> => {
  const res = await fetch("http://127.0.0.1:8080/signin", {
    method: "POST",
    body: JSON.stringify(signInData),
  });

  return res.status >= 200 && res.status < 300 ? "SIGNEDIN" : "FAILED";
};
