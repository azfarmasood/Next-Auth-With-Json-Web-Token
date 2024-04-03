"use client";
import { signOut } from "next-auth/react";

export default function Button() {
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <button onClick={handleSignOut} className="px-4 py-1.5 bg-black text-white font-bold hover:bg-gray-900 duration-300">
            Sign out
        </button>
    );
}