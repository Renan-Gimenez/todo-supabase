"use client";

import { ReactElement, ReactNode } from "react";
import useAuth from "@/services/useAuth";
import {
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  Github,
  Twitter,
  Loader,
} from "lucide-react";

interface SocialLoginButtonType {
  onClick: () => void;
  children?: ReactNode;
  icon?: ReactElement;
}

function SocialLoginButton({ icon, children, onClick }: SocialLoginButtonType) {
  return (
    <button
      className="w-10/12 flex gap-2 px-4 py-2 rounded-full justify-center mx-auto bg-violet-500 text-white"
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

export default function LoginPage() {
  const { user, loading, loginWithGitHub, loginWithTwitter, signOut } =
    useAuth();

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-bg-primary dark:text-white p-6">
      <div className="max-w-sm flex flex-col p-8 rounded-2xl shadow-xl bg-zinc-50 dark:bg-gray-800">
        {/* <div>
          <section>
            <strong>LOADING STATUS:</strong>
            <br />
            {loading == true ? <span>Loading...</span> : <span>Done</span>}
          </section>

          {user && (
            <div className="flex flex-col">
              <strong>USER INFO:</strong>
              <span>{user.email}</span>
              <span>{user.id}</span>
            </div>
          )}
        </div> */}
        <div>
          <div className="w-full flex justify-center gap-4 mb-4">
            <Clipboard className="h-8 w-auto text-violet-500" />
            <ClipboardList className="h-8 w-auto text-violet-500" />
            <ClipboardCheck className="h-8 w-auto text-violet-500" />
          </div>
          <p className="font-bold text-2xl">
            Transform your daily tasks with{" "}
            <span className="text-violet-500">ToDo-Supabase</span>
          </p>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="h-[1px] w-full bg-black dark:bg-white"></div>
          Connect
          <div className="h-[1px] w-full bg-black dark:bg-white"></div>
        </div>

        <section className="flex flex-col gap-2">
          <SocialLoginButton onClick={loginWithGitHub} icon={<Github />}>
            Login with GitHub
          </SocialLoginButton>

          <SocialLoginButton onClick={loginWithTwitter} icon={<Twitter />}>
            Login with Twitter
          </SocialLoginButton>

          {/* <SocialLoginButton onClick={signOut}>SignOut</SocialLoginButton> */}
        </section>

        {/* <div className="mt-2">
          <SocialLoginButton onClick={() => console.log(user)}>
            Log User
          </SocialLoginButton>
        </div> */}
      </div>
    </main>
  );
}
