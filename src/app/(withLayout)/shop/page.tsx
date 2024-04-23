'use client'

import ProductCart from "@/app/_components/productCart/productCart";
import { API_URL } from "@/configs/global";
import { createData, readData } from "@/core/http-service/http-service";
import { Paginate } from "@/types/paginate";
import { Product } from "@/types/product";
import { Res } from "@/types/responseType";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);
    const mount = useRef<boolean>(false);

    useEffect(() => {
        mount.current = true;
    }, []);
    useEffect(() => {
        if (!!mount.current) {
            getProducts();
            getLikedProducts();
        }
    }, [mount]);

    const getProducts = async () => {
        try {
            const res = await readData<Res<Paginate<Product>>>(`${API_URL}/v1/products`);
            !!res.data && setProducts(res.data?.elements);
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

    console.log(likedProducts)

    return (
        <>
            <section className="h-140">
                <div className="bg-[url('/images/shop-hero.jpg')] bg-cover h-full bg-center">
                    <div className="container h-full">
                        <div className="flex justify-center items-center h-full flex-col gap-12">
                            <div className="flex text-neutral-4/80 gap-6">
                                <Link href="./">Home</Link>
                                {">"}
                                <Link href="/shop" className="text-neutral-7">
                                    Shop
                                </Link>
                            </div>
                            <div className="text-[58px] text-neutral-7">Shop Page</div>
                            <div className="text-[20px] text-neutral-7">Let’s design the place you always imagined.</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-10">
                <div className="container">
                    <div className="flex gap-6">
                        <div className="w-3/12"></div>
                        <div className="w-9/12">
                            <div className="flex flex-wrap">
                                {products?.map((product: any) => (
                                    <div className="w-4/12 p-3">
                                        <ProductCart product={product} likedProducts={likedProducts} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
