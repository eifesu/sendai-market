"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { FaRedditAlien } from "react-icons/fa6"
import { useEffect } from "react"

export default function LoginButton() {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            console.log(session)
        }
    }, [session])

    return (
        <>
            {
                status == "loading" ? <Button disabled variant="ghost" size="sm">
                    Please wait <Loader2 size={12} className="animate-spin ml-2" /></Button>
                    : session ? (
                        <Button onClick={() => signOut()}>
                            Log out <ArrowRight size={14} className="ml-2" /></Button>
                    ) : (
                        <Button variant="default" onClick={() => signIn('reddit')} size="sm">
                            Login with Reddit <FaRedditAlien size={14} className="ml-2" /></Button>
                    )
            }
        </>)
}

