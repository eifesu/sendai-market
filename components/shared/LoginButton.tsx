"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { FaRedditAlien } from "react-icons/fa6"
import { TokenItem } from "@/app/page"
import { Badge } from "@/components/ui/badge"
import { Token } from "@prisma/client"
import { PiTrophyDuotone } from "react-icons/pi"

export default function LoginButton() {
    const { data: session, status } = useSession()
    return (
        <>
            {
                status == "loading" ? <Button disabled variant="ghost">
                    Please wait <Loader2 size={12} className="animate-spin ml-2" /></Button>
                    : session ? (
                        <Button onClick={() => signOut()}>
                            Log out <ArrowRight size={14} className="ml-2" /></Button>
                    ) : (
                        <Button variant="default" onClick={() => signIn('reddit')}>
                            Login with Reddit <FaRedditAlien size={14} className="ml-2" /></Button>
                    )
            }
        </>)
}
function TopTokensList({ tokens }: { tokens: Token[] }) {
    return (
        <div className="flex items-center justify-center w-full flex-col gap-2 mb-12">
            <Badge variant="secondary"><PiTrophyDuotone size={12} className="mr-1" />Top stocks</Badge>
            {tokens.map(token => <TokenItem token={token} key={token.id} />)}
        </div>
    )
}
