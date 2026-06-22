"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully! 🎉");
        router.push("/my-profile"); 
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="card bg-white shadow-xl rounded-3xl border border-slate-100 p-8 space-y-6">
          <h2 className="text-xl font-extrabold tracking-tight">Update Information</h2>
          
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold text-xs text-slate-500">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="input input-bordered rounded-xl w-full" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-xs text-slate-500">Image URL</label>
              <input 
                type="url" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                placeholder="Paste image link" 
                className="input input-bordered rounded-xl w-full" 
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => router.push("/my-profile")} 
                className="btn btn-outline w-1/2 rounded-xl"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isUpdating} 
                className="btn btn-primary w-1/2 text-white rounded-xl shadow-md bg-[#ff6b6b] border-none hover:bg-[#ff5252]"
              >
                {isUpdating ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return null;
}