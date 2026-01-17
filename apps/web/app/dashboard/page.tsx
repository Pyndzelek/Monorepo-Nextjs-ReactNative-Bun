import SignOutButton from "@/components/auth/sign-out-button";
import UserInfo from "@/components/auth/user-info";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SignOutButton />
      </div>
      <UserInfo />
    </div>
  );
}
