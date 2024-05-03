import { z } from "zod";

export const checkoutSchema = z.object({
	firstName: z.string().min(1, { message: "first name is required!" }),
	lastName: z.string().min(1, { message: "last name is required!" }),
	email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
		message: "email format is false",
	}),
	phoneNumber: z.string().regex(/^[0-9]+$/, {
		message: "phone number just should be number",
	}),
   streetAddress:z.string().min(1, { message: "street address is required!" }),
   country:z.string().min(1, { message: "street address is required!" }),
   townCity:z.string().min(1, { message: "town/city address is required!" }),
   state:z.string(),
   zipCode:z.string().min(1, { message: "zip code address is required!" }),
   cardNumber:z.string(),
   expirationDate:z.string(),
   cvc:z.string(),
});
