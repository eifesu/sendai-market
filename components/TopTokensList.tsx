"use client"

import { Badge } from "@/components/ui/badge";
import { PiTrophyDuotone } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { getTokens } from "@/server/actions";
import { useEffect, useState } from "react";
import { Token } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { TokenItem } from "./TokenItem";

export default function TopTokensList() {
    const [tokens, setTokens] = useState<Token[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            getTokens().then(tokens => setTokens(tokens))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center w-full flex-col gap-2 mb-12">
            <Badge variant="secondary"><PiTrophyDuotone size={12} className="mr-1" />All stocks</Badge>
            {tokens.length > 0 ?
                <div className="max-h-[200px] bg-background rounded-md boder border-secondary-foreground p-2 mt-2 w-full overflow-scroll">
                    {tokens.map(token => <TokenItem token={token} key={token.id} />)}
                </div>
                : <Skeleton className="h-[200px] w-full" />}
        </div>
    );
}
