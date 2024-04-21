"use client"

import { Badge } from "@/components/ui/badge";
import { PiTrophyDuotone } from "react-icons/pi";
import { TokenItem } from "../app/page";
import { useQuery } from "@tanstack/react-query";
import { getTopTokens } from "@/server/actions";
import { useEffect, useState } from "react";
import { Token } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

export default function TopTokensList() {
    const [tokens, setTokens] = useState<Token[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            getTopTokens().then(tokens => setTokens(tokens))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center w-full flex-col gap-2 mb-12">
            <Badge variant="secondary"><PiTrophyDuotone size={12} className="mr-1" />Top stocks</Badge>
            {tokens.length > 0 ? tokens.map(token => <TokenItem token={token} key={token.id} />) :
                <Skeleton className="w-full p-2" style={{ height: 57 * 3 + (8 * 3) }} />}
        </div>
    );
}
