"use client";

import { Routs } from "@/types/routs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { IconArrow, IconArrowRight, IconBasket, IconClose, IconLike, IconLogout } from "../../icon/icons";
import { signOut } from "next-auth/react";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import ProductSingle from "./productSingle";

const CartMenu = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const addressRef = useRef<HTMLDivElement>(null);
	const { cart }: { cart: Cart | null } = useCartStore();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			console.log("ghgh");
			if (addressRef.current && !addressRef?.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	async function Logout() {
		await signOut();
	}
	return (
		<div className="flex flex-col absolute -right-20 top-4 w-96" ref={addressRef}>
			<div className="flex items-center gap-8 bg-none flex-col-reverse h-8"></div>
			<div className="flex flex-col bg-neutral-2 shadow-lg  rounded">
				<div className="flex-col flex">
					<div className="text-neutral-6 p-4 border-b border-neutral-4/50 bg-white">
						{cart?.products?.length} Product in your cart
					</div>
					<div className="flex flex-col max-h-72 overflow-auto p-8">
						{!!cart &&
							cart?.products?.map((product) => <ProductSingle cartId={cart?._id} product={product} />)}
					</div>
					<div className=" p-4 flex justify-between items-center bg-white">
						<div className="flex flex-col gap-1">
							{cart?.cartSum !== cart?.cartSumWithDiscount && (
								<div className="text-neutral-5 relative text-sm opacity-70">
									${cart?.cartSum}
									<div className="h-0.25 w-[140%] absolute bg-neutral-5 top-2 -left-[20%]"></div>
								</div>
							)}
							<div className=" text-neutral-6">${cart?.cartSumWithDiscount}</div>
						</div>
						<Link href={`cart`} className="btn duration-150">
							Cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartMenu;
