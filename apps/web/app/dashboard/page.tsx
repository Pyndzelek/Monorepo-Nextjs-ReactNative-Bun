"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
        >
          Sign Out
        </button>
      </div>

      <div className="p-6 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        <div className="grid gap-2 text-sm">
          <div className="flex">
            <span className="font-medium w-24">ID:</span>
            <span className="text-gray-600">{session?.user.id}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-24">Name:</span>
            <span className="text-gray-600">{session?.user.name}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-24">Email:</span>
            <span className="text-gray-600">{session?.user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
