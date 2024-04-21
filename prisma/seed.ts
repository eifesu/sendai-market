import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tokens: {
	name: string;
	token: string;
	color: string;
}[] = [
	{
		name: "Gojo Satoru",
		token: "halve",
		color: "#00BFFF",
	},

	{
		name: "Ryomen Sukuna",
		token: "fuuga",
		color: "#FF8C00",
	},

	{
		name: "Itadori Yuji",
		token: "brat",
		color: "#FF8C00",
	},

	{
		name: "Nanami Kento",
		token: "salaryman",
		color: "#FFD700",
	},
	{
		name: "Fushiguro Megumi",
		token: "cursed",
		color: "#191970",
	},
	{
		name: "Kugisaki Nobara",
		token: "voodo",
		color: "#8B0000",
	},
	{
		name: "Inumaki Toge",
		token: "salmo",
		color: "#556B2F",
	},
];

async function main() {
	await prisma.$transaction(
		tokens.map(({ name, token, color }) => {
			return prisma.token.upsert({
				where: {
					token,
				},
				update: {
					name,
					token,
					color,
				},
				create: {
					name,
					token,
					color,
				},
			});
		})
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
