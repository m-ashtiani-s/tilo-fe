export type Checkout={
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	streetAddress: string;
	country: string;
	townCity: string;
	state: string;
	zipCode: string;
	paymentMethod: string;
	cardNumber?: string;
	expirationDate?: string;
	cvc?: string;
}