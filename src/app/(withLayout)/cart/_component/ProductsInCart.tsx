"use client";
import { IconClose } from "@/app/_components/icon/icons";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import Image from "next/image";
import ProductSingle from "./productSingle";

export default function ProductsInCart() {
	const { cart }: { cart: Cart | null } = useCartStore();

	
	return (
		<div className="flex flex-col">
			{!!cart && cart?.products?.map((product) => <ProductSingle cartId={cart?._id} product={product} />)}
		</div>
	);
}
