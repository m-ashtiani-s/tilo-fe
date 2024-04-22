"use client";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Slide, SliderProps } from "./heroSlider.types";
import { Avatar } from "../avatar";
import { useEffect, useState } from "react";
// import { slides } from "@/data/slides";

const slides = [
	{
		title:'',
		subTitle:'',
		image:'bg-hero-slide-1'

	},
	{
		title:'',
		subTitle:'',
		image:'bg-hero-slide-2'

	},
];
export default function HeroSlider() {
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
			navigation={true}
			autoplay={{
				delay: 60000,
				disableOnInteraction: false,
			}}
			pagination={{
				clickable: true,
			}}
			spaceBetween={0}
			modules={[Autoplay,Navigation, Pagination]}
			slidesPerView={1}
			className="mySwiper custom-swipper hero-slider"
			// onSlideChange={() => console.log("slide change")}
			// onSwiper={(swiper) => console.log(swiper)}
		>
			{slides?.map((slide: any, index: number) => (
				<SwiperSlide key={slide?.image + index}>
					<div className={`${slide.image} h-140 bg-cover bg-no-repeat bg-center`}></div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
