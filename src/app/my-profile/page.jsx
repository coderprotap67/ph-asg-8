import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MyProfilePage() {
  let session = null;

  try {
    // ১. better-auth সেশন নেওয়ার চেষ্টা করা হচ্ছে
    session = await auth.api.getSession({
      headers: new Headers(),
    });
  } catch (error) {
    // যদি ডাটাবেজ কানেকশন বা অন্য কোনো কারণে better-auth এরর দেয়,
    // তবে স্ক্রিনে ক্র্যাশ (Crash) না দেখিয়ে আমরা সেশনটিকে null করে দেবো।
    session = null;
  }

  // ২. ইউজার যদি সাইন-ইন করা না থাকে (অথবা ডাটাবেজ ফেইল করে), তবে সরাসরি 404 এরর দেখাবে
  if (!session || !session.user) {
    notFound();
  }

  // ৩. ইউজার সফলভাবে সাইন-ইন করা থাকলে আসল ডাটা দেখাবে
  const { user } = session;

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card bg-white shadow-xl rounded-3xl border border-slate-100 p-8 text-center space-y-6">
        <div className="avatar justify-center">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md">
            <img 
              src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ff6b6b&color=fff`} 
              alt={user.name} 
            />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-neutral">{user.name}</h2>
          <p className="text-sm text-slate-400 font-medium">{user.email}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border border-slate-100">
          Provider Strategy: <span className="text-primary">{user.provider || "Credentials"}</span>
        </div>
        <div className="pt-2">
          <Link href="/my-profile/update" className="btn btn-primary btn-sm w-full text-white rounded-lg">
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}