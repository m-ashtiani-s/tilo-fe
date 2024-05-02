import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { createData } from "./core/http-service/http-service";
// import { VerifyUserModel } from "./app/(auth)/verify/_types/verify-user.type";
// import { User, UserSession, UserToken } from "./types/user.interface";
import { API_URL } from "./configs/global";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		accessToken: string;
	}

	interface Session {
		user: any;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: any;
		role: string;
	}
}

export const { signIn, signOut, auth, handlers } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				personData: { label: "personData", type: "text" },
				password: { label: "password", type: "text" },
			},
			async authorize(credentials) {
				try {
					const verifyResponse = await createData<any, any>(`${API_URL}/v1/login`, {
						personData: credentials.personData as string,
						password: credentials.password as string,
					});

					return {
						accessToken: verifyResponse.data.token,
					};
				} catch (error: any) {
					return error;
				}
			},
		}),
	],

	session: {
		maxAge: 60 * 60 * 48,
	},
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
            //@ts-ignore
			if (!!user.success ) {
				throw new Error("custom error to the client");
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = jwtDecode<any>(user.accessToken);
				token.accessToken = user.accessToken;
			}
			console.log(token);
			// token.accessToken=user.accessToken
			return token;
		},

		async session({ session, token }) {
			const userData = {
				user: token.user,
				accessToken: token.accessToken,
			};
			session.user = userData;
			// Object.assign(session.user, userData ?? {});
			return session;
		},
	},
});
