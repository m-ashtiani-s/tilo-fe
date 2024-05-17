"use client";
import { IconClose } from "@/app/_components/icon/icons";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import Image from "next/image";
import ProductSingle from "./productSingle";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/button/button";
import ProductsInCart from "./ProductsInCart";
import CheckoutSummaryLoading from "./loadings/checkoutSummary";
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

export default function CartSummary({ shipping }: { shipping: string | null }) {
	const { cart }: { cart: Cart | null } = useCartStore();
	const loading = useCartStore((state) => state.loading);
	const [total, setTotal] = useState<number>(cart?.cartSumWithDiscount || 0);

	useEffect(() => {
		if (shipping == "Pick Up") {
			!!cart && setTotal(cart?.cartSumWithDiscount + 21);
		} else if (shipping == "Express shipping") {
			!!cart && setTotal(cart?.cartSumWithDiscount + 15);
		} else {
			!!cart && setTotal(cart?.cartSumWithDiscount);
		}
	}, [shipping, cart]);

	return (
		<>
			{!!cart && !loading && cart?.products?.length > 0 ? (
				<motion.div
					variants={boxMotions}
					initial="initial"
					animate={show}
					transition={transitionProps}
					className="flex flex-col rounded-lg border border-1 border-neutral-6 p-6"
				>
					<ProductsInCart />
					<div className="flex justify-between pt-6 pb-3 border-b border-neutral-5/30 text-neutral-7">
						<div className="text-sm">Shipping</div>
						<div className="text-sm font-semibold">
							{shipping == "Pick Up" ? "$21" : shipping == "Express shipping" ? "$15" : "Free"}
						</div>
					</div>
					<div className="flex justify-between py-3 pb-3 border-b border-neutral-5/30 text-neutral-7">
						<div className="text-sm">Subtotal</div>
						<div className="text-sm font-semibold">${cart?.cartSumWithDiscount}</div>
					</div>
					<div className="flex justify-between text-neutral-7 py-3">
						<div className="font-semibold text-lg">Total</div>
						<div className=" font-semibold text-lg">${total}</div>
					</div>
				</motion.div>
			) : loading ? (
				<CheckoutSummaryLoading />
			) : (
				<div className="border border-dashed border-1 border-neutral-4/50 p-8 py-12 w-full mx-auto rounded-lg">
					<div className="flex gap-4 items-center justify-center h-full">
						<img src="/images/search.svg" alt="" className="w-12 opacity-60" />
						There is no product
					</div>
				</div>
			)}
		</>
	);
}
