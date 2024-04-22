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
import { Page } from "@/types/paginate";
import { Product } from "@/types/product";

export default function ProductSlider() {
    const [width, setWidth] = useState<number>(0); // Initialize width with 0
    const [lastTenProducts, setLastTenProducts] = useState<Product[]>([]);

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
    }, []);

    async function fetchProducts() {
        try {
            const res = await readData<Res<Page<Product>>>(`${API_URL}/v1/products`);
            !!res.data && setLastTenProducts(res.data?.elements);
        } catch (ree) {}
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
                    <ProductCart product={slide} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
