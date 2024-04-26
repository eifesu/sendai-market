"use client"
import { useSession } from "next-auth/react";
import LoginButton from "./shared/LoginButton";

export default function TopNavigation() {
    const { data: session } = useSession();
    return <div className="p-4 bg-secondary w-full flex justify-between items-center">
        <p className="text-xs px-2 p-1 bg-zinc-700 font-mono font-semibold rounded-sm">u<span className="text-red-400">/</span>{session && session.user ? session.user.name : 'guest'}</p>
        <LoginButton />
    </div>
}