"use client";
import { useSession } from "next-auth/react";

export default function TestSession() {
  const { data: session, status } = useSession();

  return (
    <div className="p-4 text-black">
      <h2>Status: {status}</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
