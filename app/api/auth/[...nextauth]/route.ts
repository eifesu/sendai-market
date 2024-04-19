import NextAuth, { AuthOptions } from "next-auth";
import Reddit from "next-auth/providers/reddit";

const authOptions: AuthOptions = {
	providers: [Reddit({})],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
