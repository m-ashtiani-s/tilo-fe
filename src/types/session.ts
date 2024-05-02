export type Session = {
	user: SessionUser;
	expires: string;
};

export type SessionUser = {
	user: userInSession;
	accessToken: string;
};

export type userInSession = {
	user_id: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
};
