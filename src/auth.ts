import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { createData } from "./core/http-service/http-service";
// import { VerifyUserModel } from "./app/(auth)/verify/_types/verify-user.type";
// import { User, UserSession, UserToken } from "./types/user.interface";
import { API_URL } from "./configs/global";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { SessionUser, userInSession } from "./types/session";
import { UserLogin } from "./types/user";
import { Res } from "./types/responseType";

declare module "next-auth" {
	interface User {
		accessToken: string;
	}

	interface Session {
		user: SessionUser;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: userInSession;
		accessToken: string;
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
					const verifyResponse = await createData<{ personData: string; password: string }, Res<UserLogin>>(
						`${API_URL}/v1/login`,
						{
							personData: credentials.personData as string,
							password: credentials.password as string,
						}
					);

					return {
						accessToken: verifyResponse?.data?.token,
					};
				} catch (error: any) {
					return error;
				}
			},
			
		}),
	],

	session: {
		maxAge: 60*60*2 ,
		
	},
	trustHost: true,
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			//@ts-ignore
			if (!!user.success) {
				throw new Error("custom error to the client");
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = jwtDecode<userInSession>(user.accessToken);
				token.accessToken = user.accessToken;
			}
			// token.accessToken=user.accessToken
			return token;
		},

		async session({ session, token }) {
			const userData = {
				user: token.user,
				accessToken: token.accessToken,
			};
			Object.assign(session.user, userData ?? {});
			// session.user=userData as any
			// session.expires=new Date("2024-04-04T10:52:28.478Z") as any
			return session;
		},
	},
});
