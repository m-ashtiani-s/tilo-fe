"use server";

import { redirect } from "next/navigation";
import { createData } from "@/core/http-service/http-service";
//@ts-ignore
import { SignIn } from "@/app/(auth)/signin/types/signin.types";
// import { OperationResult } from "@/types/operation-resault";
import { serverActionWrapper } from "./server-action-wrapper";
// import { SendAuthCode } from "@/app/(auth)/verify/_types/verify-user.type";
import { Problem } from "@/types/http-errors.interface";
import { Register } from "@/app/(withoutLayout)/(auth)/register/_components/registerForn.types";
// import { signIn } from "@/auth";
import { API_URL } from "@/configs/global";
import { signIn } from "next-auth/react";

export async function RegisterAction(formState: any | null, formData: FormData) {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const userName = formData.get("userName") as string;
	const password = formData.get("password") as string;
	// const validatedData = signInSchema.safeParse({
	//     mobile,
	// });

	// if (!validatedData.success) {
	//     return {
	//         message: "خطا در فرمت موبایل",
	//     };
	// } else {

	return serverActionWrapper(
		async () =>
			await createData<Register, string>(`${API_URL}/v1/register`, {
				name,
				email,
				userName,
				password,
			})
	);
	// }
}

// export async function sendAuthCode(
//     formState: any | null,
//     mobile: string
// ) {
//     return serverActionWrapper(
//         async () =>
//             await createData<SendAuthCode, string>("/send-auth-code", {
//                 mobile,
//             })
//     );
// }

export async function verify(state: any, formData: FormData) {
	const personData = formData.get("personData") as string;
	const password = formData.get("password") as string;
	try {
		const res = await signIn("credentials", { personData, password });
	}catch (error:any) {
        if(!!error?.success){
            return {
                success: true,
                message: "login ss",
                data: null,
            };
        }else{
            return {
                success: false,
                message: "login failed | try again",
                data: null,
            };
        }
		
	}
}

// export async function logout() {
// }
