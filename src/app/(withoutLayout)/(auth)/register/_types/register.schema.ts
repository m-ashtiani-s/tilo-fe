import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string(),
    email: z.string()
             .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
                message: 'email format is false'
             }),
    userName: z.string()
             .regex(/^[a-zA-Z0-9]+$/, {
                message: 'userName just should be  letter and number'
             }),
    password: z.string()
             .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                message: 'password should be capital and small letter, number and special character'
             })
})