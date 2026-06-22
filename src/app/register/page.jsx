"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed!");
    } else {
      toast.success("Account created! Please log in.");
      router.push("/login");
    }
  };
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/login"
    });
  };
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-3xl border border-slate-100 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-neutral">Create Account</h1>
          <p className="text-sm text-slate-400 font-medium">Join SunCart to see private items & profile</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold text-neutral">Full Name</span></label>
            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full rounded-xl bg-slate-50 text-neutral border-slate-200" required />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold text-neutral">Email Address</span></label>
            <input type="email" placeholder="example@suncart.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full rounded-xl bg-slate-50 text-neutral border-slate-200" required />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold text-neutral">Password</span></label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full rounded-xl bg-slate-50 text-neutral border-slate-200" required />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn btn-primary w-full text-white bg-[#ff6b6b] border-none hover:bg-[#ff5252] rounded-xl font-bold shadow-md">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="divider text-xs text-slate-300 font-bold uppercase tracking-wider">Or continue with</div>

        <button onClick={handleGoogleSignIn} type="button" className="btn btn-outline w-full rounded-xl border-slate-200 hover:bg-slate-50 text-neutral font-bold flex items-center justify-center gap-3 bg-white">
          <FcGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </button>

        <div className="text-center text-sm text-slate-400 font-medium pt-2">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login here</Link>
        </div>

      </div>
    </div>
  );
}