import constants from "@/lib/constants";
import { PrismaClient } from "@prisma/client";

function getExtendedClient() {
	return new PrismaClient().$extends({
		result: {
			token: {
				value: {
					needs: {
						// @ts-ignore
						transactions: true,
					},
					compute(token): number {
						if (!token.transactions) {
							return constants.DEFAULT_TOKEN_VALUE;
						}
						return token.transactions.reduce(
							(acc, curr) => acc + curr.amount,
							constants.DEFAULT_TOKEN_VALUE
						);
					},
				},
				hourlyVariation: {
					needs: {
						// @ts-ignore
						transactions: true,
					},
					compute(token): number {
						if (!token.transactions) {
							return 0;
						}
						const currentValue = token.transactions.reduce(
							(acc, curr) => acc + curr.amount,
							constants.DEFAULT_TOKEN_VALUE
						);
						const lastHourValue = token.transactions
							.filter(
								(transaction) =>
									transaction.createdAt <
									new Date(Date.now() - 3600000)
							)
							.reduce(
								(acc, curr) => acc + curr.amount,
								constants.DEFAULT_TOKEN_VALUE
							);
						return (
							((currentValue - lastHourValue) / lastHourValue) *
							100
						);
					},
				},
			},
		},
	});
}

type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>;

const globalForPrisma = globalThis as unknown as {
	prisma: ExtendedPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? getExtendedClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
