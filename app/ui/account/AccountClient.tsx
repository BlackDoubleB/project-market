"use client";
import { UserFetch } from "@/app/lib/definitions";

export default function AccountClient({ user }: { user: UserFetch }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Account Details</h1>
      <div>
        <p>
          <strong>Role:</strong> {user.role_name}
        </p>
        <p>
          <strong>Name:</strong> {user.person_name} {user.lastname}
        </p>
        <p>
          <strong>DNI:</strong> {user.dni}
        </p>
        <p>
          <strong>Username:</strong> {user.user_name}
        </p>
        <p>
          <strong>Password:</strong> {user.password}
        </p>
      </div>
    </div>
  );
}
