"use client";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Slide, SliderProps } from "./slider.types";
import { IconQuotation } from "../icon/icons";
import { Avatar } from "../avatar";
import { useEffect, useState } from "react";
export default function Carousel({ delay = 6000, slides }: SliderProps) {
	const [width, setWidth] = useState<number>(0); // Initialize width with 0

	
	useEffect(() => {
		// Check if window is defined (client-side)
		if (typeof(window) !== 'undefined') {
		  setWidth(window.innerWidth); // Set initial width
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
				delay: 6000,
				disableOnInteraction: false,
			}}
			pagination={{
				clickable: true,
			}}
			spaceBetween={50}
			modules={[Autoplay]}
			slidesPerView={isMobile ? 1 : 3}
			// onSlideChange={() => console.log("slide change")}
			// onSwiper={(swiper) => console.log(swiper)}
		>
			{slides?.map((slide: Slide,index:number) => (
				<SwiperSlide key={slide?.name + index}>
					<div className="px-8 py-10 bg-gray-200/45 rounded">
						<div>
							<IconQuotation fill="#e15a00" width={32} height={32} viewBox="0 0 349.078 349.078" />
							<div className="h-[140px] mt-6 text-primary/70 line-clamp-5 leading-7">{slide?.comment}</div>
						</div>
						<div className="flex items-center gap-5 mt-8">
							<Avatar src={slide?.profileImageUrl} size="tiny" />
							<div className="flex flex-col">
								<div className="text-primary font-semibold leading-5">{slide?.name}</div>
								<div className="text-primary/50 text-sm leading-5">{slide?.role}</div>
							</div>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
