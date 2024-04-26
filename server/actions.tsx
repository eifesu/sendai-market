"use server"

import constants from "@/lib/constants";
import { prisma } from "@/prisma/db";
import { Token } from "@prisma/client";

interface TokenInfo extends Token {
    value: number;
    hourlyVariation: number;
}
export async function getTokens() {

    const tokens = await prisma.token.findMany({
        include: {
            transactions: true
        }

    });

    // @ts-ignore
    return tokens as TokenInfo[];
}

export async function getTransactions() {
    return await prisma.transaction.findMany({
        include: {
            token: true
        }
    });
}

export async function tradeToken(id: string, amount: number, comment: string) {
    return await prisma.transaction.create({
        data: {
            userId: "1",
            comment,
            amount,
            tokenId: id
        }
    })
}
