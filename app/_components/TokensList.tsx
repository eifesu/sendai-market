"use client"

import { getTokens } from "@/server/actions";
import { useEffect, useState } from "react";
import { Token } from "@prisma/client";
import { Skeleton } from "../../components/ui/skeleton";
import { TokenItem } from "./TokenItem";
import { Input } from "../../components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ListFilterIcon } from "lucide-react";

export default function TokensList() {
    const [tokens, setTokens] = useState<Token[]>([])
    const [search, setSearch] = useState<string>("")
    const [filter, setFilter] = useState<"name" | "value">("name");

    useEffect(() => {
        getTokens().then(tokens => setTokens(tokens))
    }, [])

    return (
        <div className="flex flex-1 items-center justify-start w-full flex-col gap-2 p-4" >
            <div className="flex w-full gap-2">
                <Input type="text" id="search" className="text-sm font-semibold" placeholder="Search token" value={search} onChange={
                    (e) => setSearch(e.target.value)
                } />
                <ToggleGroup type="single" defaultChecked={true} defaultValue="name" onValueChange={
                    (value) => setFilter(value as "name" | "value")
                }>
                    <ToggleGroupItem variant="outline" value="name" className="text-xs" aria-label="Toggle bold">
                        Name <ListFilterIcon className="h-4 w-4 ml-1" />
                    </ToggleGroupItem>
                    <ToggleGroupItem variant="outline" value="value" className="text-xs" aria-label="Toggle bold">
                        Value <ListFilterIcon className="h-4 w-4 ml-1" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            {tokens.length > 0 ?
                <div className="h-[250px] rounded-md border border-secondary w-full overflow-scroll">
                    {tokens
                        .sort(
                            (a, b) => filter === "name"
                                ? a.name.localeCompare(b.name)
                                // @ts-ignore
                                : b.value - a.value
                        )
                        .filter(token => token.name.toLowerCase().includes(search.toLowerCase())
                            || token.token.toString().includes(search.toLowerCase())
                        )
                        .map(token => <TokenItem token={token} key={token.id} />)}
                </div>
                : <Skeleton className="h-1/2 w-full" />}
        </div>
    );
}
