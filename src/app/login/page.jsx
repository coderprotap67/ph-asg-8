"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Welcome back to SunCart!");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-3xl border border-slate-100 p-8 space-y-6">
        <h2 className="text-2xl font-black text-center tracking-tight">Login to SunCart</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Email Address</label>
            <input type="email" required className="input input-bordered rounded-xl" />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Password</label>
            <input type="password" required className="input input-bordered rounded-xl" />
          </div>
          <button type="submit" className="btn btn-primary w-full text-white rounded-xl mt-2 shadow-md">Sign In</button>
        </form>
        <div className="divider text-xs text-slate-400">OR</div>
        <button className="btn btn-outline w-full rounded-xl gap-2 hover:bg-neutral">
          <FaGoogle />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}