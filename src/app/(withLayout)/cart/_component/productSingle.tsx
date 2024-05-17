"use client";
import { IconClose } from "@/app/_components/icon/icons";
import { Loading } from "@/app/_components/loading/loading";
import { API_URL } from "@/configs/global";
import { createData, deleteData, readData } from "@/core/http-service/http-service";
import { useCartStore } from "@/stores/cart.store";
import { useNotificationStore } from "@/stores/notification.store";
import { Cart, productInCart } from "@/types/cart";
import { Res } from "@/types/responseType";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

export default function ProductSingle({ product, cartId }: { product: productInCart; cartId: string }) {
	const showNotification = useNotificationStore((state) => state.showNotification);
	const [loading, setLoading] = useState<boolean>(false);
	const [quantityLoading, setQuantityLoading] = useState<boolean>(false);
	const mount = useRef<boolean>(false);
	const [quantity, setQuantity] = useState<number>(product?.quantity);
	const RemoveFromCartHandler = async () => {
		try {
			setLoading(true);
			const res = await deleteData<Res<null>>(`${API_URL}/v1/cart/${cartId}/${product?._id}`);
			if (!!res?.success) {
				
				getCart();
			}
		} catch (error: any) {
			showNotification({
				message: error?.message || "remove from cart failed",
				type: "error",
			});
			setLoading(false)
		}finally{
			
		}
	};

	const increamentHandler = async () => {
		try {
			await addQuantity(product?._id, quantity + 1);
			setQuantity((prev) => prev + 1);
		} catch (error) {}
	};
	const decreamentHandler = async () => {
		try {
			if (quantity > 1) {
				await addQuantity(product?._id, quantity - 1);
				setQuantity((prev) => prev - 1);
			}
		} catch (error) {}
	};

	useEffect(() => {
		if (!mount.current) {
			mount.current = true;
			return;
		}
	}, [quantity]);

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
			setLoading(false)
			setQuantityLoading(false);
		}
	};

	const addQuantity = async (productId: string, quantity: number) => {
		try {
			setQuantityLoading(true);
			const res = await createData<
				{
					productId: string;
					quantity: number;
				},
				Res<null>
			>(`${API_URL}/v1/cart-quantity`, {
				productId: productId,
				quantity: quantity,
			});
			if (!!res?.success) {
				getCart();
			}
		} catch (error: any) {
			showNotification({
				message: error?.message || "add to cart failed",
				type: "error",
			});
			setQuantityLoading(false);
		} finally {
			
		}
	};

	return (
		<motion.div variants={boxMotions} initial="initial" animate={show} transition={transitionProps}>
			<div className="flex py-6 border-b border-neutral-5/30 items-center">
				<div className="flex w-6/12 items-center gap-6">
					<Image src={product?.featuredImage} alt={product?.title} width={80} height={96} />
					<div className="flex flex-col gap-1.5">
						<div className="text-neutral-7 font-semibold text-sm">{product?.title}</div>
						<div
							className="text-neutral-5 text-sm flex items-center cursor-pointer"
							onClick={RemoveFromCartHandler}
						>
							{loading ? <Loading /> : <IconClose className="relative top-1" />}
							Remove
						</div>
					</div>
				</div>
				<div className="flex w-2/12 justify-center">
					<div className="flex py-2 px-4 justify-between gap-2  text-neutral-6 border border-neutral-6 border-1 rounded">
						<button
							disabled={quantityLoading}
							className="p-1 cursor-pointer disabled:cursor-not-allowed"
							onClick={decreamentHandler}
						>
							-
						</button>
						<span className="p-1 w-8 flex items-center justify-center">
							{quantityLoading ? (
								<div className="w-full flex items-center justify-center">
									<Loading />
								</div>
							) : (
								quantity
							)}
						</span>
						<button
							disabled={quantityLoading}
							className="p-1 cursor-pointer disabled:cursor-not-allowed"
							onClick={increamentHandler}
						>
							+
						</button>
					</div>
				</div>
				<div className="flex w-2/12 flex-col gap-2 justify-center items-center">
					<div className="text-neutral-7 font-semibold">${product?.priceWithDiscount}</div>
					{product?.price !== product?.priceWithDiscount && (
						<div className="text-neutral-5 relative text-sm opacity-70">
							${product?.price}
							<div className="h-0.25 w-[140%] absolute bg-neutral-5 top-2 -left-[20%]"></div>
						</div>
					)}
				</div>
				<div className="flex w-2/12 flex-col gap-2 justify-center items-center">
					<div className="text-neutral-7 font-semibold">${product?.priceWithDiscount * quantity}</div>
					{product?.price !== product?.priceWithDiscount && (
						<div className="text-neutral-5 relative text-sm opacity-70">
							${product?.price * quantity}
							<div className="h-0.25 w-[140%] absolute bg-neutral-5 top-2 -left-[20%]"></div>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}
