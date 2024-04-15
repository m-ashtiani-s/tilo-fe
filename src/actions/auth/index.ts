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

export async function RegisterAction(
    formState: any | null,
    formData: FormData
) {
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
                await createData<Register, string>("/register", {
                    name,
                    email,
                    userName,
                    password
                })
        );
    // }
}

// export async function sendAuthCode(
//     formState: any | null,
//     mobile: string
// ) {
//     console.log('fff')
//     return serverActionWrapper(
//         async () =>
//             await createData<SendAuthCode, string>("/send-auth-code", {
//                 mobile,
//             })
//     );
// }


// export async function verify(state: Problem | undefined, formData: FormData) {
//     try {
//         console.log('ff')
//     } catch (error) {
//         // todo
//         return {
//             status: 0,
//             title: "",
//         } satisfies Problem;
//     }
// }

// export async function logout() {
//     console.log('ff')
// }