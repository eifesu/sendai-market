"use client"

import LoginButton from "@/components/shared/LoginButton"
import TopTokensList from "@/components/TopTokensList"
import { Badge } from "@/components/ui/badge"
import { PiFlagBannerDuotone } from "react-icons/pi"


export default function Home() {
    return (
        <main className="flex flex-col p-4 flex-1 relative w-full items-center justify-between">
            <div className="flex-1 flex flex-col text-center items-center justify-start gap-2">
                <TopTokensList />
                <Badge variant="secondary"><PiFlagBannerDuotone size={12} className="mr-1" /> A fantasy stock market</Badge>
                <h1 className="text-3xl font-bold mb-2">Predict Gege&apos;s plot and become the richest one.</h1>
                <LoginButton />
            </div>
            <Badge variant="outline">@eifesu</Badge>
        </main>
    )
}
