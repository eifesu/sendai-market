"use client"

import { cn, shadeFromHex } from "@/lib/utils"
import { Token } from "@prisma/client"
import { HiCubeTransparent } from "react-icons/hi"
import { PiCaretDownDuotone, PiCaretUpDuotone } from "react-icons/pi"
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

    return (
        <div className="p-2 border-b border-b-secondary w-full flex justify-between items-center">
            <div className="flex items-center justify-start gap-2">
                <div className={cn(`h-8 w-8 rounded-full bg-secondary flex items-center justify-center`)} style={{
                    backgroundColor: token.color
                }}>
                    <HiCubeTransparent size={16} color={shadeFromHex(token.color)} />
                </div>
                <div className="flex flex-col items-start justify-start gap-0">
                    <span className="font-mono text-sm font-bold"><span className="text-red-400">$</span>{token.token}</span>
                    <span className="text-xs text-gray-400">({token.name})</span>
                </div>
            </div>
            <div className="flex itemscenter justify-end gap-2">
                <div className="flex flex-col items-end justify-end">
                    {/* @ts-ignore */}
                    <p className="font-bold font-mono">${token.value}</p>
                    {/* @ts-ignore */}
                    <Variation variation={token.hourlyVariation} />
                </div>
                <TradeDialog token={token} />
            </div>

        </div>
    )
}