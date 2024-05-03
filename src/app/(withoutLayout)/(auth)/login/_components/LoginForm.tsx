"use client";

import { TextInput } from "@/app/_components/form-input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notification.store";
import { Button } from "@/app/_components/button/button";
import { Login } from "./loginForn.types";
import { loginSchema } from "../_types/login.schema";
import { signIn } from "next-auth/react";
import {} from "@/auth";

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>({
		resolver: zodResolver(loginSchema),
	});

	const router = useRouter();

	const showNotification = useNotificationStore((state) => state.showNotification);

	const onSubmit = async (data: Login) => {
		const user = {
			redirect: false,
			personData: data.personData,
			password: data.password,
		};
		const res = await signIn("credentials", user);
		if (!!res?.error) {
			showNotification({
				message: "Login failed",
				type: "error",
			});
		} else {
			showNotification({
				message: "Login successfull",
				type: "success",
			});
			setTimeout(() => {
				router.push("/");
			}, 1000);
		}
	};

	return (
		<div className="w-9/12">
			<div className="text-4xl font-medium text-neutral-7">Login</div>
			<div className=" font-medium text-neutral-4 mt-6">
				Dont have account?{" "}
				<Link className="text-secondary-green font-semibold" href="/register">
					Sign up
				</Link>
			</div>
			<div className="mt-4">
				<form className="flex flex-col gap-6 mt-16" onSubmit={handleSubmit(onSubmit)}>
					<TextInput<Login> register={register} name={"personData"} errors={errors} placeholder="userName" className=" border-b border-b-neutral-3" />
					<TextInput<Login> register={register} name={"password"} errors={errors} placeholder="password" className=" border-b border-b-neutral-3" />

					<Button type="submit">Sign Up</Button>
					<Link className="text-secondary-green text-center font-semibold" href="/">
						Home Page
					</Link>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
