"use server"

import constants from "@/lib/constants";
import { prisma } from "@/prisma/db";


export async function getTopTokens() {

    const tokens = await prisma.token.findMany({
        take: 3,
        orderBy: {
            name: "desc",
        },
    });

    return tokens;
}

export async function getTokenValue(id: string) {

    const transactions = await prisma.transaction.findMany({
        where: {
            tokenId: id
        }
    })

    return transactions.reduce((acc, curr) => acc + curr.amount, constants.DEFAULT_TOKEN_VALUE)
}

export async function getHourlyTokenVariation(id: string) {


    const transactions = await prisma.transaction.findMany({
        where: {
            tokenId: id,
        }
    })

    const currentValue = transactions.reduce((acc, curr) => acc + curr.amount, constants.DEFAULT_TOKEN_VALUE)
    const lastHourValue = transactions.filter(transaction => transaction.createdAt < new Date(Date.now() - 3600000)).reduce((acc, curr) => acc + curr.amount, constants.DEFAULT_TOKEN_VALUE)

    return ((currentValue - lastHourValue) / lastHourValue) * 100
}

export async function sellToken(id: string) {
    return await prisma.transaction.create({
        data: {
            amount: Math.ceil(Math.random() * 2 - 1),
            tokenId: id
        }
    })
}
