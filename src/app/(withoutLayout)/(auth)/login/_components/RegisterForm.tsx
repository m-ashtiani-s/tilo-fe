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
import { signOut } from "next-auth/react";

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

	// useEffect(() => {
	// 	if (formState && !formState.isSuccess && formState.error) {
	// 		console.log(formState.error);
	// 		formState?.error?.data?.map((d: any) => {
	// 			showNotification({
	// 				message: d.message,
	// 				type: "error",
	// 			});
	// 		});
	// 	} else if (formState && formState.isSuccess) {
	// 		showNotification({
	// 			message: "you signed up successfully.",
	// 			type: "info",
	// 		});
	// 		setTimeout(() => {
	// 			router.push(`/login`);
	// 		}, 2000);
	// 	}
	// }, [formState, showNotification, router, getValues]);

	const onSubmit = (data: Login) => {
		const formData = new FormData();
		formData.append("personData", data.personData);
		formData.append("password", data.password);
		startTransition(async () => {
			await action(formData);
		});
		console.log(formData)
	};

	async function myFunction() {
        const csrfToken = await signOut()
        /* ... */
      }

	return (
		<div className="w-9/12">
			<div className="text-4xl font-medium text-neutral-7">Sign up</div>
			<div className=" font-medium text-neutral-4 mt-6">
				Already have a account?{" "}
				<span className="text-secondary-green font-semibold" onClick={myFunction}>
					Login
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
