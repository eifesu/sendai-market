"use client"

import { cn, shadeFromHex } from "@/lib/utils"
import { getHourlyTokenVariation, getTokenValue, tradeToken } from "@/server/actions"
import { Token } from "@prisma/client"
import { useEffect, useState } from "react"
import { HiCubeTransparent } from "react-icons/hi"
import { Button } from "./ui/button"
import { CgArrowsExchangeAltV } from "react-icons/cg"
import { PiCaretDownDuotone, PiCaretUpDuotone } from "react-icons/pi"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import TradeDialog from "./TradeDialog"

function Variation({ variation }: { variation: number }) {
    return (
        <div className={cn("flex gap-1 font-bold items-center justify-center font-mono text-xs", {
            "text-green-400": variation > 0,
            "text-red-400": variation < 0,
            "text-gray-400": variation === 0
        })}>
            {variation > 0 ?
                <PiCaretUpDuotone size={10} /> :
                <PiCaretDownDuotone size={10} />}
            <p>{variation.toFixed(2)}%
            </p>
        </div>
    )
}

export function TokenItem({ token }: { token: Token }) {

    const [value, setValue] = useState<number>(0)
    const [variation, setVariation] = useState<number>(0)

    useEffect(() => {
        getTokenValue(token.id).then(value => setValue(value))
        getHourlyTokenVariation(token.id).then(variation => setVariation(variation))
    }, [])

    return (
        <div className="p-2 border-b border-b-secondary w-full flex justify-between items-center">
            <div className="flex items-center justify-start gap-2">
                <div className={cn(`h-8 w-8 rounded-full bg-secondary flex items-center justify-center`)} style={{
                    backgroundColor: token.color
                }}>
                    <HiCubeTransparent size={16} color={shadeFromHex(token.color)} />
                </div>
                <div className="flex flex-col items-start justify-start gap-0">
                    <span className="font-mono font-bold"><span className="text-red-400">$</span>{token.token}</span>
                    <span className="text-xs text-gray-400">({token.name})</span>
                </div>
            </div>
            <div className="flex itemscenter justify-end gap-2">
                <div className="flex flex-col items-end justify-end">
                    <p className="font-bold font-mono">${value}</p>
                    <Variation variation={variation} />
                </div>
                <TradeDialog token={token} />
            </div>

        </div>
    )
}