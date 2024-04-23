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

interface Iprops {
    product: any;
    likedProducts: Product[] | null;
}

export default function ProductCart({ product, likedProducts }: Iprops) {
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        likedProducts?.map((liked) => {
            liked?._id === product._id && setLiked(true);
        });
    }, [likedProducts]);

    const likeProductHandler = async () => {
        try {
            const res = await createData<any, Res<Product>>(
                `${API_URL}/v1/like`,
                {
                    productId: product?._id,
                },
                {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYyODAzMzUwNDhiY2M2MzM2ZWM1ZjY5IiwiZW1haWwiOiJra2VmZnJAamRqZC5jb20iLCJpYXQiOjE3MTM4OTgyOTksImV4cCI6MTcxMzkyNzA5OX0.dLnOV6Uhz9Af-dZYB71xHfka6e4YzLA2CjCV1oF0zt0",
                }
            );
            !!res.success && setLiked(!liked);
        } catch (error) {
            console.log("error: ", error);
        } finally {
        }
    };

    return (
        <div>
            <div className="flex flex-col ">
                <div className="relative">
                    <Link href={`/shop/${product?._id}`}>
                        <img src={product?.featuredImage} alt="product" className="w-full" />
                    </Link>

                    <div className="w-10/12 absolute left-[8.33333%] bottom-6">
                        <Button className="w-full">add to cart</Button>
                    </div>
                    <span className="absolute text-neutral-7 leading-4 py-1 px-4 rounded bg-white top-4 left-4 text-sm font-semibold">NEW</span>
                    {!!product?.discount && (
                        <span className="absolute text-white leading-4 py-1 px-4 rounded bg-secondary-green top-12 left-4 text-sm">-{product?.discount}%</span>
                    )}
                    <span className="absolute h-8 w-8 flex items-center justify-center rounded-full shadow-md bg-white top-4 right-4">
                        <IconLike
                            onClick={likeProductHandler}
                            strokeWidth={3}
                            className={` hover:fill-red-500 duration-200 cursor-pointer  hover:stroke-neutral-4/0 ${
                                liked ? "fill-red-500 stroke-neutral-4/0" : "fill-red-500/0 stroke-neutral-4"
                            }`}
                        />
                    </span>
                </div>
                <Link href={`/shop/${product?._id}`}>
                    <div className="text-neutral-7">★★★★★</div>
                    <div className="text-neutral-7 font-semibold mt-1">{product?.title}</div>
                    <div className="flex gap-4 mt-1">
                        <div className="text-neutral-7">${product?.priceWithDiscount}</div>
                        {!!product.discount && (
                            <div className="text-neutral-4 relative">
                                ${product?.price}
                                <span className="w-full absolute h-0.25 bg-neutral-4 left-0 top-2.5 "></span>
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}
