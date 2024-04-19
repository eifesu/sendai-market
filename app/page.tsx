
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/prisma/db"
import { TokensIcon } from "@radix-ui/react-icons"
import { ArrowRight, Loader2 } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { FaRedditAlien } from "react-icons/fa6"
import { HiCubeTransparent } from "react-icons/hi"

function LoginButton() {

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

export default async function Home() {
    const tokens = await prisma.token.findMany()
    return (
        <main className="flex flex-col p-4 flex-1 relative w-full items-center justify-center">
            <div className="flex-1 flex flex-col text-center items-center justify-center gap-4">
                <Badge variant="secondary">A goofy fantasy economy game</Badge>
                <h1 className="text-3xl font-bold">Always bet on <span className="font-mono text-cyan-500">$half</span> and make profit !</h1>
                {/* <LoginButton /> */}
                <Button >Create a token <HiCubeTransparent className="ml-2" /></Button>
            </div>
        </main>
    )
}
