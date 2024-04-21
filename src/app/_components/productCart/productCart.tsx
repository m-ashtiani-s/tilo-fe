"use client";

import Image from "next/image";
import { Button } from "../button/button";
import { IconLike } from "../icon/icons";

const product = {
	_id: "6625659cd70b0b991fa7973f",
	title: "Loveseat Sofa",
	numbersOfRate: 1,
	rate: 5,
	images: ["https://ayliweb.ir/wp-content/uploads/2024/04/Paste-image.jpg"],
	price: 43,
	discount: 20,
	discountExpire: null,
	shortInfo: "short",
	additionalInfo: "long",
	measurement: "12*14*16",
	colors: null,
	tags: ["tag-1", "tag-2"],
	category: ["662564a9d70b0b991fa79739", "662564a5d70b0b991fa79736"],
	categoryNames: ["cat1", "cat2"],
	createdAt: "2024-04-21T19:14:36.402Z",
	updatedAt: "2024-04-21T19:14:36.402Z",
	__v: 0,
};

export default function ProductCart() {
	return (
		<div>
			<div className="flex flex-col ">
				<div className="relative">
					<img src={product.images[0]} alt="product" className="w-full"/>
					<div className="w-10/12 absolute left-[8.33333%] bottom-6">
						<Button className="w-full">add to cart</Button>
					</div>
                    <span className="absolute text-neutral-7 leading-4 py-1 px-4 rounded bg-white top-4 left-4 text-sm font-semibold">NEW</span>
                    <span className="absolute text-white leading-4 py-1 px-4 rounded bg-secondary-green top-12 left-4 text-sm">-{product.discount}%</span>
                    <span className="absolute h-8 w-8 flex items-center justify-center rounded-full shadow-md bg-white top-4 right-4">
                        <IconLike strokeWidth={3} className="fill-red-500/0 hover:fill-red-500 duration-200 cursor-pointer stroke-neutral-4 hover:stroke-neutral-4/0" />
                    </span>
				</div>
				<div className="text-neutral-7">★★★★★</div>
				<div className="text-neutral-7 font-semibold mt-1">{product?.title}</div>
				<div className="flex gap-4 mt-1">
					<div className="text-neutral-7">${product.price}</div>
					<div className="text-neutral-4 relative">
						${product.price}
						<span className="w-full absolute h-0.25 bg-neutral-4 left-0 top-2.5 "></span>
					</div>
				</div>
			</div>
		</div>
	);
}
