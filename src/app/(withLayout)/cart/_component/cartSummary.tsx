"use client";
import { IconClose } from "@/app/_components/icon/icons";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import Image from "next/image";
import ProductSingle from "./productSingle";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/button/button";
import Link from "next/link";
import CartSummaryLoading from "./loading/sidebarLoading";
import { motion } from "framer-motion";

const boxMotions = {
	initial: { opacity: 0 },
};

const transitionProps = {
	duration: 0.2,
	scale: {
		type: "spring",
		damping: 50,
		stiffness: 400,
	},
};

const show = {
	opacity: 1,
	display: "block",
};

export default function CartSummary() {
	const { cart }: { cart: Cart | null } = useCartStore();
	const loading = useCartStore((state) => state.loading);
	const [total, setTotal] = useState<number>(cart?.cartSumWithDiscount || 0);
	const [cartMehod, setCartMethod] = useState<string>("");

	const changeval = (e: any) => {
		setCartMethod(e.target.value);
	};

	useEffect(() => {
		if (cartMehod == "Pick Up") {
			!!cart && setTotal(cart?.cartSumWithDiscount + 21);
		} else if (cartMehod == "Express shipping") {
			!!cart && setTotal(cart?.cartSumWithDiscount + 15);
		} else {
			!!cart && setTotal(cart?.cartSumWithDiscount);
		}
	}, [cartMehod, cart]);

	useEffect(() => {
		!!cart && cart?.products?.length>0 ? setCartMethod("Pick Up") : setCartMethod("")
	}, [cart]);
	

	return (
		<>
			{!!cart && !loading ? (
				<motion.div
					variants={boxMotions}
					initial="initial"
					animate={show}
					transition={transitionProps}
					className="flex flex-col rounded-lg border border-1 border-neutral-6 p-6"
				>
					<div className="flex flex-col gap-3">
						<label
							htmlFor="1"
							className={`${
								cartMehod == "Free shipping" ? "bg-neutral-4/5 border-neutral-6" : "border-neutral-5"
							} duration-200 cursor-pointer flex items-center rounded border border-1 px-4 py-3 justify-between text-neutral-7`}
						>
							<div className="flex gap-2 items-center">
								<input
									className="w-4 h-4 accent-neutral-7 bg-gray-100 border-gray-300 "
									checked={cartMehod == "Free shipping"}
									type="radio"
									name="cartMethod"
									value="Free shipping"
									id="1"
									onChange={changeval}
								/>
								<div>Free shipping</div>
							</div>
							<div className="">$0.00</div>
						</label>
						<label
							htmlFor="2"
							className={`${
								cartMehod == "Express shipping" ? "bg-neutral-4/5 border-neutral-6" : "border-neutral-5"
							} duration-200 cursor-pointer flex items-center rounded border border-1 px-4 py-3 justify-between text-neutral-7`}
						>
							<div className="flex gap-2 items-center">
								<input
									className="w-4 h-4 accent-neutral-7 bg-gray-100 border-gray-300 "
									type="radio"
									checked={cartMehod == "Express shipping"}
									name="cartMethod"
									value="Express shipping"
									id="2"
									onChange={changeval}
								/>
								<div>Express shipping</div>
							</div>
							<div className="">$15.00</div>
						</label>
						<label
							htmlFor="3"
							className={`${
								cartMehod == "Pick Up" ? "bg-neutral-4/5 border-neutral-6" : "border-neutral-5"
							} duration-200 cursor-pointer flex items-center rounded border border-1 px-4 py-3 justify-between text-neutral-7`}
						>
							<div className="flex gap-2 items-center">
								<input
									className="w-4 h-4 accent-neutral-7 bg-gray-100 border-gray-300 "
									type="radio"
									checked={cartMehod == "Pick Up"}
									name="cartMethod"
									value="Pick Up"
									id="3"
									onChange={changeval}
								/>
								<div>Pick Up</div>
							</div>
							<div className="">$21.00</div>
						</label>
					</div>
					<div className="flex justify-between pt-6 pb-3 border-b border-neutral-5/30 text-neutral-7">
						<div className="text-sm">Subtotal</div>
						<div className="text-sm font-semibold">${cart?.cartSumWithDiscount}</div>
					</div>
					<div className="flex justify-between text-neutral-7 py-3">
						<div className="font-semibold text-lg">Total</div>
						<div className=" font-semibold text-lg">${total}</div>
					</div>
					<Link href={`checkout?shipping=${cartMehod}`} className="btn duration-150 mt-6 w-full">
						Checkout
					</Link>
				</motion.div>
			) : loading ? (
				<CartSummaryLoading />
			) : (
				<>ffefew</>
			)}
		</>
	);
}
