"use client";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import ProductCart from "../productCart/productCart";
import { readData } from "@/core/http-service/http-service";
import { API_URL } from "@/configs/global";
import { Res } from "@/types/responseType";
import { Paginate } from "@/types/paginate";
import { Product } from "@/types/product";
import { headers } from "next/headers";
import { useNotificationStore } from "@/stores/notification.store";
import { useSessionStore } from "@/stores/session";
import { Session } from "@/types/session";
import CartLoading from "../productCart/loadings/cartLoading";

export default function ProductSlider() {
	const { session }: { session: Session | null } = useSessionStore();
	const [width, setWidth] = useState<number>(0);
	const [lastTenProducts, setLastTenProducts] = useState<Product[]>([]);
	const [likedProducts, setLikedProducts] = useState<Product[]>([]);
	const showNotification = useNotificationStore((state) => state.showNotification);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
			window.addEventListener("resize", handleWindowSizeChange);
			return () => {
				window.removeEventListener("resize", handleWindowSizeChange);
			};
		}
	}, []);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	const isMobile = width <= 768;

	useEffect(() => {
		fetchProducts();
		fetchLikedProducts();
	}, []);

	async function fetchProducts() {
		try {
			setLoading(true);
			const res = await readData<Res<Paginate<Product>>>(`${API_URL}/v1/products`);
			!!res.data && setLastTenProducts(res.data?.elements);
		} catch (err: any) {
			showNotification({
				message: err?.message || "loading product failed",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	}
	async function fetchLikedProducts() {
		try {
			const res = await readData<Res<Product[]>>(`${API_URL}/v1/liked-products`);
			!!res.data && setLikedProducts(res?.data);
		} catch (err: any) {}
	}
	return (
		<Swiper
			autoplay={{
				delay: 80000,
				disableOnInteraction: false,
			}}
			spaceBetween={32}
			modules={[Autoplay]}
			slidesPerView={4}
			className="mySwiper custom-swipper"
		>
			{loading ? (
				<div className="flex"><CartLoading width="w-3/12" />
				<CartLoading width="w-3/12" />
				<CartLoading width="w-3/12" />
				<CartLoading width="w-3/12" /></div>
			) : (
				<>
					{lastTenProducts?.map((slide, index: number) => (
						<SwiperSlide key={index}>
							<ProductCart product={slide} likedProducts={likedProducts} loggedIn={!!session} />
						</SwiperSlide>
					))}
				</>
			)}
		</Swiper>
	);
}
