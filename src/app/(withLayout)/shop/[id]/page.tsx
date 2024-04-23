"use client";

import { Button } from "@/app/_components/button/button";
import { IconArrow, IconLike } from "@/app/_components/icon/icons";
import { Timer } from "@/app/_components/timer/timer";
import { API_URL } from "@/configs/global";
import { createData, readData } from "@/core/http-service/http-service";
import { Product } from "@/types/product";
import { Res } from "@/types/responseType";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const [liked, setLiked] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);

    const ex = !!product?.discountExpire ? product?.discountExpire : "";
    const expireDate = new Date(ex);
    const now = new Date();

    useEffect(() => {
        getProduct(id);
        getLikedProducts();
    }, []);
    useEffect(() => {
        likedProducts?.map((liked) => {
            liked?._id === product?._id && setLiked(true);
        });
    }, [likedProducts]);

    const getProduct = async (id: string) => {
        try {
            const res = await readData<Res<Product>>(`${API_URL}/v1/products/${id}`);
            !!res.data && setProduct(res?.data);
        } catch (error) {
            console.log("error: ", error);
        } finally {
        }
    };
    const likeProductHandler = async () => {
        try {
            const res = await createData<any, Res<Product>>(
                `${API_URL}/v1/like`,
                {
                    productId: product?._id,
                },
                {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYyNzY0NzA0ZTI3MjZlYWE3ZmM5M2U0IiwiZW1haWwiOiJra2VyMUBqZGpkLmNvbSIsImlhdCI6MTcxMzg2NDkyOCwiZXhwIjoxNzEzODkzNzI4fQ.FGMNkPU0wVMwZJTn_46DFV2EmujuDfC0xtdNL3_kx00",
                }
            );
            !!res.success && setLiked(!liked);
        } catch (error) {
            console.log("error: ", error);
        } finally {
        }
    };

    const getLikedProducts = async () => {
        try {
            const res = await readData<Res<Product[]>>(`${API_URL}/v1/liked-products`, {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYyNzY0NzA0ZTI3MjZlYWE3ZmM5M2U0IiwiZW1haWwiOiJra2VyMUBqZGpkLmNvbSIsImlhdCI6MTcxMzg2NDkyOCwiZXhwIjoxNzEzODkzNzI4fQ.FGMNkPU0wVMwZJTn_46DFV2EmujuDfC0xtdNL3_kx00",
            });

            !!res.data && setLikedProducts(res.data);
        } catch (error) {
            console.log("error: ", error);
        } finally {
        }
    };
    return (
        <>
            <section className="py-4">
                <div className="container">
                    <div className="flex text-neutral-4/80 gap-4">
                        <Link href="./">Home</Link>
                        {">"}
                        <Link href="./">shop</Link>
                        {">"}
                        <Link href="/shop" className="text-neutral-7">
                            {product?.title}
                        </Link>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="container">
                    <div className="flex gap-16">
                        <div className="w-5/12">
                            <div>
                                <div className="relative">
                                    <img src={product?.featuredImage} alt="product" className="w-full" />

                                    <span className="absolute text-neutral-7 leading-4 py-1 px-4 rounded bg-white top-4 left-4 text-sm font-semibold">NEW</span>
                                    {!!product?.discount && (
                                        <span className="absolute text-white leading-4 py-1 px-4 rounded bg-secondary-green top-12 left-4 text-sm">
                                            -{product?.discount}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-7/12">
                            <div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-neutral-7 ">★★★★★</div>
                                    <div className="text-neutral-7 text-xs">{product?.numbersOfRate} Reviews</div>
                                </div>
                                <div className="mt-4 text-5xl text-neutral-7 font-medium">{product?.title}</div>
                                <div className="mt-4  text-neutral-4">{product?.shortInfo}</div>
                                <div className="mt-4  flex gap-4 items-center font-medium">
                                    <div className="text-neutral-7 text-3xl">${product?.priceWithDiscount}</div>
                                    {!!product?.discount && (
                                        <div className="text-neutral-4/80 relative text-2xl">
                                            ${product?.price}
                                            <span className="w-full absolute h-0.25 bg-neutral-4/80 left-0 top-4 "></span>
                                        </div>
                                    )}
                                </div>

                                {!!product?.discountExpire && expireDate > now && (
                                    <div className="">
                                        <div className="w-10/12 bg-neutral-4/20 h-0.25 my-6"></div>
                                        <Timer className="my-8 mb-16" size="small" expiryTimestamp={expireDate} />
                                    </div>
                                )}
                                <div className="w-10/12 bg-neutral-4/20 h-0.25 my-6"></div>
                                <div className="flex flex-col gap-2">
                                    <div className=" text-neutral-4 font-medium">Measurements</div>
                                    <div className=" text-neutral-4 text-xl">{product?.measurement} cm</div>
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className=" text-neutral-4 font-medium flex items-center">
                                        Choose Color <IconArrow strokeWidth={0} fill="rgb(108 114 117)" className="r -rotate-90" />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="w-8 h-8 rounded-full bg-secondary-green"></span>
                                        <span className="w-8 h-8 rounded-full bg-secondary-red"></span>
                                        <span className="w-8 h-8 rounded-full bg-secondary-blue"></span>
                                        <span className="w-8 h-8 rounded-full bg-secondary-orange"></span>
                                    </div>
                                </div>
                                <div className="mt-8 flex gap-4">
                                    <div className="flex py-3 px-6 justify-between gap-2 bg-[#F5F5F5] text-neutral-4">
                                        <span className="p-1 cursor-pointer">-</span>
                                        <span className="p-1">1</span>
                                        <span className="p-1 cursor-pointer">+</span>
                                    </div>
                                    <Button onClick={likeProductHandler} isOutline={true} className="w-full flex items-center justify-center gap-3">
                                        <IconLike
                                            className={` hover:fill-red-500 duration-200 cursor-pointer  hover:stroke-neutral-4/0 ${
                                                liked ? "fill-red-500 stroke-neutral-4/0" : "fill-red-500/0 stroke-neutral-4"
                                            }`}
                                        />
                                        Wishlist
                                    </Button>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <Button className="w-full h-[52px]">
                                        <div className="text-base">Add to Cart</div>
                                    </Button>
                                </div>
                                <div className="w-10/12 bg-neutral-4/20 h-0.25 my-6"></div>
                                <div className="flex  gap-12">
                                    <div className=" text-neutral-4/80 text-sm">categories:</div>
                                    <div className=" text-neutral-5 text-sm">{product?.categoryNames.join(" , ")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
