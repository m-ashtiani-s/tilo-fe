"use client";
import { IconClose } from "@/app/_components/icon/icons";
import { API_URL } from "@/configs/global";
import { createData, deleteData, readData } from "@/core/http-service/http-service";
import { useCartStore } from "@/stores/cart.store";
import { useNotificationStore } from "@/stores/notification.store";
import { Cart, productInCart } from "@/types/cart";
import { Res } from "@/types/responseType";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProductSingle({ product, cartId }: { product: productInCart; cartId: string }) {
	const showNotification = useNotificationStore((state) => state.showNotification);
	const [loading, setLoading] = useState<boolean>(false);
	const mount = useRef<boolean>(false);
	const [quantity, setQuantity] = useState<number>(product?.quantity);
	const setCartLoading = useCartStore((state) => state.setLoading);
	const RemoveFromCartHandler = async () => {
		try {
			setCartLoading(true)
			setLoading(true);
			const res = await deleteData<Res<null>>(`${API_URL}/v1/cart/${cartId}/${product?._id}`);
			if (!!res?.success) {
				showNotification({
					message: res?.message,
					type: "success",
				});
				getCart();
			}
		} catch (error: any) {
			showNotification({
				message: error?.message || "remove from cart failed",
				type: "error",
			});
			setCartLoading(false)
		}
	};

	const increamentHandler = () => {
		setQuantity((prev) => prev + 1);
	};
	const decreamentHandler = () => {
		quantity > 1 && setQuantity((prev) => prev - 1);
	};

	useEffect(() => {
		if (!mount.current) {
			mount.current = true;
			return;
		}

		addQuantity(product?._id, quantity);
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
			setCartLoading(false)
		}
	};

	const addQuantity = async (productId: string, quantity: number) => {
		try {
			setCartLoading(true)
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
				// showNotification({
				// 	message: res?.message,
				// 	type: "success",
				// });
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
		<div className="flex py-6 border-b border-neutral-5/30 items-start justify-between">
			<div className="flex items-center gap-6">
				<Image src={product?.featuredImage} alt={product?.title} width={80} height={96} />
				<div className="flex flex-col items-start gap-2">
					<div className="text-neutral-7 font-semibold whitespace-nowrap">{product?.title}</div>
					<div className="flex py-1 px-2 justify-between gap-1 text-sm text-neutral-6 border border-neutral-6 border-1 rounded">
						<span className="p-1 cursor-pointer" onClick={decreamentHandler}>
							-
						</span>
						<span className="p-1">{quantity}</span>
						<span className="p-1 cursor-pointer" onClick={increamentHandler}>
							+
						</span>
					</div>
					<div className="flex gap-4 justify-center items-center">
						{product?.price !== product?.priceWithDiscount && (
							<div className="text-neutral-5 relative text-sm opacity-70">
								${product?.price}
								<div className="h-0.25 w-[140%] absolute bg-neutral-5 top-2 -left-[20%]"></div>
							</div>
						)}
						<div className="text-neutral-7 font-semibold">${product?.priceWithDiscount}</div>
					</div>
				</div>
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
	);
}
