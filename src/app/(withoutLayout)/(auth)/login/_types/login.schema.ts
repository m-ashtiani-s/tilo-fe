import { z } from "zod";

export const loginSchema = z.object({
	personData: z.string(),
	password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
		message: "password should be capital and small letter, number and special character",
	}),
});
