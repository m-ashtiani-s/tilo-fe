"use client";

import { TextInput } from "@/app/_components/form-input";
import Input from "@/app/_components/input/input";
import { ContactFormtype } from "@/types/contactForm.types";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notification.store";
import { Button } from "@/app/_components/button/button";
import { RegisterAction, verify } from "@/actions/auth";
import { AnyARecord } from "dns";
import { Login } from "./loginForn.types";
import { loginSchema } from "../_types/login.schema";
import { signOut,signIn } from "next-auth/react";

const RegisterForm = () => {
	const [formValues, setFormValues] = useState<ContactFormtype>({});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormValues((prevFormValues: ContactFormtype) => ({
			...prevFormValues,
			[name]: value,
		}));
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<Login>({
		resolver: zodResolver(loginSchema),
	});

	const [formState, action] = useFormState(verify, null);
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const showNotification = useNotificationStore((state) => state.showNotification);

	useEffect(() => {
		// if (formState && !formState.success) {
		// 	showNotification({
		// 		message: formState?.message,
		// 		type: "error",
		// 	});
		// } else if (formState && formState.success) {
		// 	showNotification({
		// 		message: "you signed up successfully.",
		// 		type: "info",
		// 	});
		// 	setTimeout(() => {
		// 		router.push(`/`);
		// 	}, 1000);
		// }
		console.log(formState)
	}, [formState, showNotification, router, getValues]);

	const onSubmit = (data: Login) => {
		const formData = new FormData();
		formData.append("personData", data.personData);
		formData.append("password", data.password);

		const user = {
			personData: data.personData,
			password: data.password,
		};
		startTransition(async () => {
			await action(formData);
		});
		// login(user)
	};

	async function myFunction() {
		await signOut();
	}
	// async function login(user:any) {
	// 	try{
	// 		await signIn('credentials',user);
	// 	}catch(err){
	// 		console.log('popo',err)
	// 	}
	// }

	return (
		<div className="w-9/12">
			<div className="text-4xl font-medium text-neutral-7">Login</div>
			<div className=" font-medium text-neutral-4 mt-6">
				Dont have account?{" "}
				<Link className="text-secondary-green font-semibold" href="/register">
					Sign up
				</Link>
				<span className="text-secondary-green font-semibold ml-5" onClick={myFunction}>
					logout
				</span>
			</div>
			<div className="mt-4">
				<form className="flex flex-col gap-6 mt-16" onSubmit={handleSubmit(onSubmit)}>
					<TextInput<Login> register={register} name={"personData"} errors={errors} placeholder="userName" />
					<TextInput<Login> register={register} name={"password"} errors={errors} placeholder="password" />

					<Button type="submit">Sign Up</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
