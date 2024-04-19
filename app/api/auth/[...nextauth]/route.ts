import NextAuth, { AuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";

const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		RedditProvider({
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
		}),
	],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
