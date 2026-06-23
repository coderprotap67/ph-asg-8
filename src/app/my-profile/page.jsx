"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your profile!");
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (session?.user) {
    const user = session.user;

    const handleLogOut = async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("Logged out successfully!");
              router.push("/login");
              router.refresh();
            },
          },
        });
      } catch (error) {
        toast.error("Failed to log out");
      }
    };

    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-bold text-neutral">My Profile</h2>
          <button onClick={handleLogOut} className="btn btn-xs btn-error text-white rounded-lg px-3 py-1">
            Log Out
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          {user.image ? (
            <img 
              src={user.image} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-[#ff6b6b] mb-2 shadow-sm" 
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#ff6b6b] text-white flex items-center justify-center text-3xl font-bold mb-2 shadow-sm">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <h3 className="text-xl font-bold mt-2 text-slate-800">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        <div className="w-full pt-4 border-t border-slate-100">
          <Link 
            href="/my-profile/update" 
            className="btn btn-primary w-full bg-[#ff6b6b] border-none text-white font-bold rounded-xl shadow-md hover:bg-[#ff5252] text-center block leading-[3rem]"
          >
            Update Information
          </Link>
        </div>
      </div>
    );
  }
  return null;
}