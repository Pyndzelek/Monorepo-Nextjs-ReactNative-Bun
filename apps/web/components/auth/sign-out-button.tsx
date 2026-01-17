"use client";

import { useAuth } from "@/hooks/use-auth";

function SignOutButton() {
  const { user, logout, isLoading, isPending } = useAuth();
  return (
    <button
      onClick={() => logout.mutate()}
      disabled={isLoading}
      className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {logout.isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}

export default SignOutButton;
