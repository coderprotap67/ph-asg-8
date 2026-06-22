import { headers } from "next/headers";
import { auth } from "@/lib/auth"; 
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton"; 

export const dynamic = "force-dynamic";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">My Profile</h2>
        <LogoutButton />
      </div>

      <div className="flex flex-col items-center mb-6">
        {user.image ? (
          <img 
            src={user.image} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-2 shadow-sm" 
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl font-bold mb-2 shadow-sm">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <h3 className="text-xl font-bold mt-2 text-slate-800">{user.name}</h3>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      <div className="w-full pt-4 border-t border-slate-100">
        <Link 
          href="/my-profile/update" 
          className="btn btn-primary w-full bg-[#ff6b6b] border-none text-white font-bold rounded-xl shadow-md hover:bg-[#ff5252] transition-colors text-center block leading-[3rem]"
        >
          Update Information
        </Link>
      </div>
    </div>
  );
}