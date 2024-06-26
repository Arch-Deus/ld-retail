import { cookies } from "next/headers";

import SignOutAction from "./SignOutAction";
import { redirect } from "next/navigation";

export default async function SignOut() {
  async function deleteTokens() {
    "use server";

    cookies().delete("Authorization");

    redirect("/")
  }

  return <SignOutAction deleteTokens={deleteTokens} />;
}