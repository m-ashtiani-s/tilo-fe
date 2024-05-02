export type UserLogin = {
	user: User;
	token: string;
};
export type User = {
	_id: string;
	email: string;
	userName: string;
	name?: string;
	role: string;
	password: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};
