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
import { useSession } from "next-auth/react";

export default function ProductSlider() {
	const {data:session}=useSession()
	const [width, setWidth] = useState<number>(0); // Initialize width with 0
	const [lastTenProducts, setLastTenProducts] = useState<Product[]>([]);
	const [likedProducts, setLikedProducts] = useState<Product[]>([]);
	const showNotification = useNotificationStore((state) => state.showNotification);

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
			const res = await readData<Res<Paginate<Product>>>(`${API_URL}/v1/products`);
			!!res.data && setLastTenProducts(res.data?.elements);
		} catch (ree) {}
	}
	async function fetchLikedProducts() {
		try {
			const res = await readData<Res<Product[]>>(`${API_URL}/v1/liked-products`);
			!!res.data && setLikedProducts(res?.data);
			console.log(res)
		} catch (err:any) {
			console.log(err)
            showNotification({
				message: err?.message,
				type: "error",
			});
        }
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
			{lastTenProducts?.map((slide: any, index: number) => (
				<SwiperSlide key={index}>
					<ProductCart product={slide} likedProducts={likedProducts} loggedIn={!!session} />
				</SwiperSlide>
			))}
		</Swiper>
	);
}
