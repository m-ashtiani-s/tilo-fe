import { Problem } from "@/types/http-errors.interface";
import { AnyAaaaRecord } from "dns";

export async function serverActionWrapper<T>(
    action: () => Promise<T>
): Promise<any> {
    try {
        const response = await action();
        return { isSuccess: true, response };
    } catch (error: unknown) {
        const err = error as Problem;
        if (err) {
            console.log(err)
            return {
                isSuccess: false,
                error: err,
            };
        }
    }
    throw new Error("خطای ناشناخته");
}