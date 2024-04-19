"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { signIn } from "next-auth/react"


export default function Home() {
    return (
        <main className="p-4 flex flex-1 flex-col items-center text-center justify-center h-full gap-4 w-full">
            <h1 className="text-4xl font-bold">Trade the worst possible stonks.</h1>
            <Button variant="default" onClick={() => signIn('reddit')}>
                Login with Reddit <Icon icon="basil:reddit-solid" className="ml-2" /></Button>
        </main>
    )
}
