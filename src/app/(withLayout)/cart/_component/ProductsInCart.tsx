"use client";
import { IconClose } from "@/app/_components/icon/icons";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import Image from "next/image";
import ProductSingle from "./productSingle";
import ProductSingleLoading from "./loading/productSingleLoading";

export default function ProductsInCart() {
	const { cart }: { cart: Cart | null } = useCartStore();
	const loading = useCartStore((state) => state.loading);

	return (
		<div className="flex flex-col">
			{!!cart && !loading ? (
				cart?.products?.length > 0 ? (
					cart?.products?.map((product) => <ProductSingle cartId={cart?._id} product={product} />)
				) : (
					<div className="border border-dashed border-1 border-neutral-4/50 p-8 py-12 w-10/12 mx-auto rounded-lg mt-6">
						<div className="flex gap-4 items-center justify-center h-full">
							<img src="/images/search.svg" alt="" className="w-12 opacity-60" />
							No Product Found in cart!
						</div>
					</div>
				)
			) : loading ? (
				<>
					<ProductSingleLoading />
					<ProductSingleLoading />
				</>
			) : (
				<>dddd</>
			)}
		</div>
	);
}
