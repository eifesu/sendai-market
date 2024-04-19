"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Loader2 } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"


export default function Home() {
    const { data: session, status } = useSession()
    return (
        <main className="p-4 flex flex-1 flex-col items-center text-center justify-center h-full gap-4 w-full">
            <Badge variant="secondary">A goofy fantasy economy game</Badge>
            <h1 className="text-4xl font-bold">Trade the worst possible stonks.</h1>
            {
                status == "loading" ? <Button disabled variant="ghost">
                    Please wait <Loader2 size={12} className="animate-spin ml-2" /></Button>
                    : session ? (
                        <Button onClick={() => signOut()}>
                            Log out <Icon fontSize={12} icon="akar-icons:arrow-right" className="ml-2" /></Button>
                    ) : (
                        <Button variant="default" onClick={() => signIn('reddit')}>
                            Login with Reddit <Icon fontSize={12} icon="basil:reddit-solid" className="ml-2" /></Button>
                    )
            }

        </main>
    )
}
