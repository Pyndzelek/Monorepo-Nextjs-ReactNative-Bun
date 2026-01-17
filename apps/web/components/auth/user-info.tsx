"use client";

import { useAuth } from "@/hooks/use-auth";

function UserInfo() {
  const { user } = useAuth();
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div className="grid gap-2 text-sm">
        <div className="flex">
          <span className="font-medium w-24">ID:</span>
          <span className="text-gray-600">{user?.id}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-24">Name:</span>
          <span className="text-gray-600">{user?.name}</span>
        </div>
        <div className="flex">
          <span className="font-medium w-24">Email:</span>
          <span className="text-gray-600">{user?.email}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
