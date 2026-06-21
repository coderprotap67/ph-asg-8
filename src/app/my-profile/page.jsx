"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyProfilePage() {
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
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };
  const handleLogOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully!");
            router.push("/login");
          },
        },
      });
    } catch (error) {
      toast.error("Failed to log out");
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
      <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-2xl border border-base-200">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button onClick={handleLogOut} className="btn btn-xs btn-error text-white">
            Log Out
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
          {session.user.image ? (
            <img 
              src={session.user.image} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary mb-2" 
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mb-2">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="text-sm text-gray-400">{session.user.email}</p>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="input input-bordered w-full" 
              required
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Profile Image URL</span></label>
            <input 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="Paste image link (e.g. https://...)"
              className="input input-bordered w-full" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isUpdating}
            className="btn btn-primary w-full text-white mt-2"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    );
  }
  return null;
}