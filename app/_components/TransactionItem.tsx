import { Transaction } from "@prisma/client";

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
    return <div>
        <div>{transaction.amount}</div>
        <div>{transaction.comment}</div>
    </div>
}