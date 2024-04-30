"use client";

import { TextInput } from "@/app/_components/form-input";
import Link from "next/link";
import { Register } from "./registerForn.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notification.store";
import { Button } from "@/app/_components/button/button";
import { registerSchema } from "../_types/register.schema";
import { API_URL } from "@/configs/global";
import { createData } from "@/core/http-service/http-service";
import { useState } from "react";

const RegisterForm = () => {
	const router = useRouter();
	const [loading,setLoading]=useState<boolean>(false)
	const showNotification = useNotificationStore((state) => state.showNotification);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Register>({
		resolver: zodResolver(registerSchema),
	});
	

	const onSubmit = (data: Register) => {
		const user={
			name:data.name || '',
			email:data.email || '',
			userName:data.userName || '',
			password:data.password || ''
		}
		registerUser(user)
		
	};

	const registerUser=async(user:any)=>{
		try{
			setLoading(true)
			const res=await createData<any, any>(`${API_URL}/v1/register`, user)
			!!res?.success && showNotification({
				message: res?.message,
				type: "success",
			});
			setTimeout(()=>{
				router.push('/login')
			},1000)
		}catch(err:any){
			showNotification({
				message: !!err?.message ? err?.message : 'Umknown error | Try again later',
				type: "error",
			});
		}finally{
			setLoading(false)
		}
	}

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

					<Button loadingText="Signing up..." isLoading={loading} disabled={loading} type="submit">Sign Up</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
