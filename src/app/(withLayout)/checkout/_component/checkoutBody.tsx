"use client";

import { Button } from "@/app/_components/button/button";
import { TextInput } from "@/app/_components/form-input";
import { IconMoney } from "@/app/_components/icon/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "../_types/ckeckout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkout } from "../_types/checkout.type";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import { createData, readData } from "@/core/http-service/http-service";
import { Res } from "@/types/responseType";
import { API_URL } from "@/configs/global";
import { useNotificationStore } from "@/stores/notification.store";
import { useRouter } from "next/navigation";

type createOrder = Checkout & {
	cartId?: string;
};

export default function CheckoutBody() {
    const router=useRouter()
	const showNotification = useNotificationStore((state) => state.showNotification);
	const [cartMehod, setCartMethod] = useState<string>("credit");
	const { cart }: { cart: Cart | null } = useCartStore();
	const setCartLoading = useCartStore((state) => state.setLoading);
	const changeval = (e: any) => {
		setCartMethod(e.target.value);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Checkout>({
		resolver: zodResolver(checkoutSchema),
	});

	const onSubmit = (data: Checkout) => {
		const ckeckoutForm = {
			cartId: cart?._id,
			firstName: data.firstName || "",
			lastName: data.lastName || "",
			phoneNumber: data.phoneNumber || "",
			email: data.email || "",
			streetAddress: data.streetAddress || "",
			country: data.country || "",
			townCity: data.townCity || "",
			state: data.state || "",
			zipCode: data.zipCode || "",
			paymentMethod: cartMehod,
			cardNumber: data.cardNumber || "",
			expirationDate: data.expirationDate || "",
			cvc: data.cvc || "",
		};
		!!cart?._id && createOrder(ckeckoutForm)
	};

	const getCart = async () => {
		try {
			const res = await readData<Res<Cart>>(`${API_URL}/v1/cart`);

			!!res.success && useCartStore.setState({ cart: res?.data });
		} catch (error: any) {
			error?.code !== 401 &&
				showNotification({
					message: error?.message || "get cart items failed",
					type: "error",
				});
		} finally {
			setCartLoading(false)
		}
	};

	const createOrder = async (data: createOrder) => {
		try {
			setCartLoading(true)
			const res = await createData<createOrder, Res<string>>(`${API_URL}/v1/order`, data);
			if (!!res?.success) {
				getCart();
                showNotification({
                    message: res?.message,
                    type: "success",
                });
                !!res?.data && router.push(`order/${res?.data}`)
			}
		} catch (error: any) {
			showNotification({
				message: error?.message || "add to cart failed",
				type: "error",
			});
			setCartLoading(false)
		} finally {
		}
	};

	return (
		<div className="">
			<form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="border border-neutral-5 rounded-lg py-10 px-6 flex flex-col gap-6">
					<div className="text-2xl font-medium text-neutral-7">Contact Infomation</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">FIRST NAME *</div>
							<TextInput<Checkout>
								register={register}
								name={"firstName"}
								errors={errors}
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
								placeholder="first name"
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">LAST NAME *</div>
							<TextInput<Checkout>
								register={register}
								name={"lastName"}
								errors={errors}
								placeholder="last name"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">PHONE NUMBER *</div>
							<TextInput<Checkout>
								register={register}
								name={"phoneNumber"}
								errors={errors}
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
								placeholder="phone number"
							/>
						</div>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">EMAIL ADDRESS</div>
							<TextInput<Checkout>
								register={register}
								name={"email"}
								errors={errors}
								placeholder="email"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
					</div>
				</div>
				<div className="border border-neutral-5 rounded-lg py-10 px-6 flex flex-col gap-6">
					<div className="text-2xl font-medium text-neutral-7">Shipping Address</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">STREET ADDRESS *</div>
							<TextInput<Checkout>
								register={register}
								name={"streetAddress"}
								errors={errors}
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
								placeholder="first name"
							/>
						</div>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">COUNTRY *</div>
							<TextInput<Checkout>
								register={register}
								name={"country"}
								errors={errors}
								placeholder="last name"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">TOWN/ / CITY *</div>
							<TextInput<Checkout>
								register={register}
								name={"townCity"}
								errors={errors}
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
								placeholder="phone number"
							/>
						</div>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">STATE</div>
							<TextInput<Checkout>
								register={register}
								name={"state"}
								errors={errors}
								placeholder="email"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">ZIP CODE *</div>
							<TextInput<Checkout>
								register={register}
								name={"zipCode"}
								errors={errors}
								placeholder="email"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
					</div>
				</div>
				<div className="border border-neutral-5 rounded-lg py-10 px-6 flex flex-col gap-6">
					<div className="text-2xl font-medium text-neutral-7">Payment method</div>

					<div className="flex flex-col gap-3 w-full">
						<label
							htmlFor="1"
							className={`${
								cartMehod == "credit" ? "bg-neutral-4/5 border-neutral-6" : "border-neutral-5"
							} duration-200 w-full cursor-pointer flex items-center rounded border border-1 px-4 py-3 justify-between text-neutral-7`}
						>
							<div className="flex gap-2 items-center">
								<input
									className="w-4 h-4 accent-neutral-7 bg-gray-100 border-gray-300 "
									checked={cartMehod == "credit"}
									type="radio"
									name="paymentMethod"
									value="credit"
									id="1"
									onChange={changeval}
								/>
								<div>Pay by Card Credit</div>
							</div>
							<div className="">
								<IconMoney />
							</div>
						</label>
						<label
							htmlFor="2"
							className={`${
								cartMehod == "paypal" ? "bg-neutral-4/5 border-neutral-6" : "border-neutral-5"
							} duration-200 cursor-pointer flex items-center rounded border border-1 px-4 py-3 justify-between text-neutral-7`}
						>
							<div className="flex gap-2 items-center">
								<input
									className="w-4 h-4 accent-neutral-7 bg-gray-100 border-gray-300 "
									type="radio"
									checked={cartMehod == "paypal"}
									name="paymentMethod"
									value="paypal"
									id="2"
									onChange={changeval}
								/>
								<div>Paypal</div>
							</div>
						</label>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">CARD NUMBER</div>
							<TextInput<Checkout>
								register={register}
								name={"cardNumber"}
								errors={errors}
								placeholder="last name"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
					</div>
					<div className="flex gap-6 items-start">
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">EXPIRATION DATE</div>
							<TextInput<Checkout>
								register={register}
								name={"expirationDate"}
								errors={errors}
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
								placeholder="phone number"
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							<div className="text-sm font-medium text-neutral-6">CVC</div>
							<TextInput<Checkout>
								register={register}
								name={"cvc"}
								errors={errors}
								placeholder="email"
								className="border border-neutral-5/30 focus:border-neutral-5 duration-200 rounded-md"
							/>
						</div>
					</div>
				</div>

				<Button loadingText="Signing up..." type="submit">
					Place Order
				</Button>
			</form>
		</div>
	);
}
