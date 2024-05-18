"use client";
import { useSearchParams } from "next/navigation";
import ProductsInCart from "./_component/ProductsInCart";
import CartSummary from "./_component/cartSummary";
import CheckoutBody from "./_component/checkoutBody";
import CheckoutPage from "./_component/chackoutPage/checkoutPage";
import { Suspense } from "react";

export default function Page() {
	
	return (
		<Suspense>
			<CheckoutPage />
		</Suspense>
	);
}
