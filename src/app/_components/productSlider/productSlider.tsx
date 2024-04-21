"use client";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import ProductCart from "../productCart/productCart";

const slides=[1,2,3,4,5,6,7,8,9,10]
export default function ProductSlider() {
	const [width, setWidth] = useState<number>(0); // Initialize width with 0

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
			// onSlideChange={() => console.log("slide change")}
			// onSwiper={(swiper) => console.log(swiper)}
		>
			{slides?.map((slide: any, index: number) => (
				<SwiperSlide key={index}>
					<ProductCart />
				</SwiperSlide>
			))}
		</Swiper>
	);
}
