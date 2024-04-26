"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { getTransactions } from "@/server/actions"
import useSWR from "swr"
import TransactionItem from "./TransactionItem"
export default function TransactionList() {

    const { data: transactions, isLoading } = useSWR("transactions", getTransactions)

    return <div className="flex flex-1 w-full h-full p-4 flex-co flex-coll">
        {(isLoading || !transactions) ? <Skeleton className="w-full h-full" />
            : transactions.map(transaction => <TransactionItem key={transaction.id} transaction={transaction} />)}
    </div>
}