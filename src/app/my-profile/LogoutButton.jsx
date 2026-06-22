"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

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
    <button onClick={handleLogOut} className="btn btn-xs btn-error text-white rounded-lg">
      Log Out
    </button>
  );
}