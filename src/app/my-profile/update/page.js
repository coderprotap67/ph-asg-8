"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    router.push("/my-profile");
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card bg-white shadow-xl rounded-3xl border border-slate-100 p-8 space-y-6">
        <h2 className="text-xl font-extrabold tracking-tight">Update Information</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Name</label>
            <input type="text" placeholder="Update Name" className="input input-bordered rounded-xl" required />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-slate-500">Image URL</label>
            <input type="url" placeholder="Update Profile Image Link" className="input input-bordered rounded-xl" />
          </div>
          <button type="submit" className="btn btn-primary w-full text-white rounded-xl mt-2 shadow-md">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
}