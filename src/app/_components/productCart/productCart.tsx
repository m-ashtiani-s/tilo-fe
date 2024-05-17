"use client";

import Image from "next/image";
import { Button } from "../button/button";
import { IconLike } from "../icon/icons";
import Link from "next/link";
import { createData, readData } from "@/core/http-service/http-service";
import { API_URL } from "@/configs/global";
import { useEffect, useState } from "react";
import { Res } from "@/types/responseType";
import { Product } from "@/types/product";
import { useNotificationStore } from "@/stores/notification.store";
import { useCartStore } from "@/stores/cart.store";
import { Cart } from "@/types/cart";
import { Loading } from "../loading/loading";
import { motion } from "framer-motion";

interface Iprops {
	product: Product | null;
	likedProducts: Product[] | null;
	loggedIn: boolean;
}

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

export default function ProductCart({ product, likedProducts, loggedIn = false }: Iprops) {
	const showNotification = useNotificationStore((state) => state.showNotification);
	const [liked, setLiked] = useState<boolean>(false);
	const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false);
	const [likeLoading, setLikeLoading] = useState<boolean>(false);
	const setLoading = useCartStore((state) => state.setLoading);

	useEffect(() => {
		setLiked(false);
	}, [product]);
	useEffect(() => {
		likedProducts?.map((liked) => {
			liked?._id === product?._id && setLiked(true);
		});
	}, [likedProducts, product]);

	const likeProductHandler = async () => {
		try {
			setLikeLoading(true);
			const res = await createData<{ productId?: string }, Res<Product>>(`${API_URL}/v1/like`, {
				productId: product?._id,
			});
			!!res.success && setLiked(!liked);
		} catch (error) {
		} finally {
			setLikeLoading(false);
		}
	};

	const addTocartHandler = () => {
		!!product?._id && addToCart(product?._id, 1);
	};

	const addToCart = async (productId: string, quantity: number) => {
		try {
			setLoading(true)
			setAddToCartLoading(true);
			const res = await createData<{ productId: string; quantity: number }, Res<null>>(`${API_URL}/v1/cart`, {
				productId: productId,
				quantity: quantity,
			});

			!!res.success && getCart();
			showNotification({
				message: res?.message,
				type: "success",
			});
		} catch (error: any) {
			showNotification({
				message: error?.message || "add to cart failed",
				type: "error",
			});
			setLoading(false)
		} finally {
			setAddToCartLoading(false);
		}
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
			setLoading(false)
		}
	};

	return (
		<motion.div variants={boxMotions} initial="initial" animate={show} transition={transitionProps}>
			<div className="flex flex-col ">
				<div className="relative">
					<Link href={`/shop/${product?._id}`}>
						<img src={product?.featuredImage} alt="product" className="w-full" />
					</Link>

					<div className="w-10/12 absolute left-[8.33333%] bottom-6">
						<Button
							isLoading={addToCartLoading}
							loadingText="Adding to cart"
							className="w-full"
							onClick={addTocartHandler}
						>
							add to cart
						</Button>
					</div>
					<span className="absolute text-neutral-7 leading-4 py-1 px-4 rounded bg-white top-4 left-4 text-sm font-semibold">
						NEW
					</span>
					{!!product?.discount && (
						<span className="absolute text-white leading-4 py-1 px-4 rounded bg-secondary-green top-12 left-4 text-sm">
							-{product?.discount}%
						</span>
					)}
					{!!loggedIn && (
						<span className="absolute h-8 w-8 flex items-center justify-center rounded-full shadow-md bg-white top-4 right-4">
							{likeLoading ? (
								<Loading />
							) : (
								<IconLike
									onClick={likeProductHandler}
									strokeWidth={3}
									className={` hover:stroke-red-500 duration-200 cursor-pointer ${
										liked ? "fill-red-500 stroke-neutral-4/0" : "fill-red-500/0 stroke-neutral-4"
									}`}
								/>
							)}
						</span>
					)}
				</div>
				<Link href={`/shop/${product?._id}`}>
					<div className="text-neutral-7">★★★★★</div>
					<div className="text-neutral-7 font-semibold mt-1">{product?.title}</div>
					<div className="flex gap-4 mt-1">
						<div className="text-neutral-7">${product?.priceWithDiscount}</div>
						{!!product?.discount && (
							<div className="text-neutral-4 relative">
								${product?.price}
								<span className="w-full absolute h-0.25 bg-neutral-4 left-0 top-2.5 "></span>
							</div>
						)}
					</div>
				</Link>
			</div>
		</motion.div>
	);
}
