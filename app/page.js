"use client";
import checkAuth from "@/hooks/checkAuth";

export default function Home() {
  const { user } = checkAuth();
  return (
    <div className="p-4 w-full bg-slate-50">
      <div className="bg-white flex justify-between items-center w-[92%] mx-auto container">
        <p>Welcome, {user.displayName} - Homepage</p>
        <p>You must be logged in to view this page - protected route.</p>
      </div>
    </div>
  );
}
