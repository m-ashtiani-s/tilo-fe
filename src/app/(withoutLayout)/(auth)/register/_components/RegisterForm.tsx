"use client";

import { TextInput } from "@/app/_components/form-input";
import Input from "@/app/_components/input/input";
import { ContactFormtype } from "@/types/contactForm.types";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { Register } from "./registerForn.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notification.store";
import { Button } from "@/app/_components/button/button";
import { RegisterAction } from "@/actions/auth";
import { registerSchema } from "../_types/register.schema";
import { AnyARecord } from "dns";

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
	} = useForm<Register>({
		resolver: zodResolver(registerSchema),
	});

	const [formState, action] = useFormState(RegisterAction, null);
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const showNotification = useNotificationStore((state) => state.showNotification);

	useEffect(() => {
		if (formState && !formState.isSuccess && formState.error) {
			console.log(formState.error);
			formState?.error?.data?.map((d: any) => {
				showNotification({
					message: d.message,
					type: "error",
				});
			});
		} else if (formState && formState.isSuccess) {
			showNotification({
				message: "you signed up successfully.",
				type: "info",
			});
			setTimeout(() => {
				router.push(`/login`);
			}, 2000);
		}
	}, [formState, showNotification, router, getValues]);

	const onSubmit = (data: Register) => {
		const formData = new FormData();
		!!data.name && formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("userName", data.userName);
		formData.append("password", data.password);
		startTransition(async () => {
			await action(formData);
		});
	};

	return (
		<div className="w-9/12">
			<div className="text-4xl font-medium text-neutral-7">Sign up</div>
			<div className=" font-medium text-neutral-4 mt-6">
				Already have a account?{" "}
				<Link className="text-secondary-green font-semibold" href="/login">
					Login
				</Link>
			</div>
			<div className="mt-4">
				{/* <Input
				placeholder="Your Name"
				className="w-full"
				name="fullName"
				value={formValues?.fullName}
				onChange={handleChange}
				setValue={setFormValues}
				groupValue={true}
			/> */}
				<form className="flex flex-col gap-6 mt-16" onSubmit={handleSubmit(onSubmit)}>
					<TextInput<Register> register={register} name={"name"} errors={errors} placeholder="name" />
					<TextInput<Register> register={register} name={"userName"} errors={errors} placeholder="userName" />
					<TextInput<Register> register={register} name={"email"} errors={errors} placeholder="email" />
					<TextInput<Register> register={register} name={"password"} errors={errors} placeholder="password" />

					<Button type="submit">Sign Up</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
