"use client";

import Image from "next/image";
import { Button } from "../button/button";
import { IconLike } from "../icon/icons";
import Link from "next/link";

interface Iprops {
    product: any;
}

export default function ProductCart({ product }: Iprops) {
    console.log(product);
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
                            strokeWidth={3}
                            className="fill-red-500/0 hover:fill-red-500 duration-200 cursor-pointer stroke-neutral-4 hover:stroke-neutral-4/0"
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
