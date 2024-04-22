import ProductCart from "@/app/_components/productCart/productCart";
import { API_URL } from "@/configs/global";
import { Page } from "@/types/paginate";
import { Product } from "@/types/product";
import { Res } from "@/types/responseType";
import Link from "next/link";

async function getProducts() {
    const res = await fetch(`${API_URL}/v1/products`, {
        next: {
            revalidate: 60 * 60 * 24,
        },
    });
    return res.json();
}

export default async function Page() {
    const productsList = getProducts();
    const [products]: [Res<Page<Product>>] = await Promise.all([productsList]);

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
                                {products.data?.elements.map((product: any) => (
                                    <div className="w-4/12 p-3">
                                        <ProductCart product={product} />
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
