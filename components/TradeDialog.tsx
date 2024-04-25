"use client"
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Token } from "@prisma/client";
import { MinusIcon, PlusCircle, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getTokenValue, tradeToken } from "@/server/actions";
import { getToken } from "next-auth/jwt";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function TradeDialog({ token }: { token: Token }) {
    const [amount, setAmount] = useState<number>(0)
    const [value, setValue] = useState<number>(0)
    const [comment, setComment] = useState<string>("")

    useEffect(() => {
        getTokenValue(token.id).then(value => setValue(value))
    }, [token])

    return <Dialog>
        <DialogTrigger>
            <Button variant="secondary" size="sm">Trade <CgArrowsExchangeAltV size={16} /></Button>
        </DialogTrigger>
        <DialogContent className="max-w-[325px]">
            <DialogHeader className="space-y-4">
                <DialogTitle>Trade <span className="font-mono bg-secondary ml-1 px-1 rounded-md"><span className="text-red-400">$</span>{token.token}</span></DialogTitle>
                <DialogDescription className="text-xs">
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>

                <div className="w-full flex justify-between items-center">
                    <Button variant="secondary" className="bg-red-700" onClick={() => setAmount(prev => prev - 1)}>
                        Sell <MinusIcon size={12} className="ml-2" />
                    </Button>
                    <div className="flex flex-col">
                        <p className="font-extrabold text-3xl">{amount}</p>
                        <p className={cn("text-sm font-mono",
                            amount > 0 ? "text-red-400" : "text-green-400"
                        )}>${- (amount * value)}<span className="text-xs font-bold text-muted-foreground">(${value})</span></p>
                    </div>
                    <Button variant="secondary" className="bg-green-700" onClick={() => setAmount(prev => prev + 1)}>
                        Buy <PlusIcon size={12} className="ml-2" />
                    </Button>
                </div>
                <Input type="text" id="email" placeholder="Comment (optional)" />
                <Button variant="secondary" disabled={amount == 0} onClick={() => tradeToken(token.id, amount, comment).finally(() => {

                })}>
                    Gamble
                    <CgArrowsExchangeAltV size={16} className="ml-2" />
                </Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}