"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSun, FaBars } from "react-icons/fa"; 
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; 

export default function Navbar() {
  const router = useRouter();
  
  const { data: session } = authClient.useSession(); 

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out safely!");
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  return (
    <div className="flex items-center justify-between bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/20 shadow-sm px-4 md:px-8 h-16">
            <div className="flex-1 flex justify-start items-center gap-2">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-neutral hover:text-primary">
            <FaBars className="text-lg" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-slate-100 font-semibold text-neutral">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/my-profile">My Profile</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold tracking-wide flex items-center gap-2 text-primary p-0 hover:bg-transparent">
          <FaSun className="animate-spin-slow text-[#ff6b6b]" />
          <span>SunCart</span>
        </Link>
      </div>
      <div className="flex-1 hidden md:flex justify-center">
        <div className="flex items-center gap-8 font-semibold text-neutral">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <Link href="/my-profile" className="hover:text-primary transition-colors">My Profile</Link>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-primary/20">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={session.user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-slate-100">
              <li className="px-4 py-2 font-bold text-sm border-b border-slate-100 text-primary">{session.user.name}</li>
              <li><Link href="/my-profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="text-error font-semibold">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm text-neutral hover:text-primary font-semibold">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm text-white shadow-md bg-[#ff6b6b] border-none hover:bg-[#ff5252] font-semibold rounded-xl">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}