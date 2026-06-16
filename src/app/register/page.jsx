"use client";

import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success("Account created! Navigating to login...");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] px-4">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-3xl border border-slate-100 p-8 space-y-6">
        <h2 className="text-2xl font-black text-center tracking-tight">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Name</label>
            <input type="text" required className="input input-bordered rounded-xl" />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Email</label>
            <input type="email" required className="input input-bordered rounded-xl" />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Photo URL</label>
            <input type="url" className="input input-bordered rounded-xl" />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Password</label>
            <input type="password" required className="input input-bordered rounded-xl" />
          </div>
          <button type="submit" className="btn btn-primary w-full text-white rounded-xl mt-2 shadow-md">Register</button>
        </form>
        <div className="divider text-xs text-slate-400">OR</div>
        <button className="btn btn-outline w-full rounded-xl gap-2 hover:bg-neutral">
          <FaGoogle />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}