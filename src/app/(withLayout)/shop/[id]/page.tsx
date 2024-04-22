
import Timer from "@/app/_components/timer/timer";
import { API_URL } from "@/configs/global";
import { Product } from "@/types/product";
import { Res } from "@/types/responseType";
import Link from "next/link";

async function getProduct(slug: string) {
    console.log(slug);
    const res = await fetch(`${API_URL}/v1/products/${slug}`, {
        next: {
            revalidate: 24 * 60 * 60,
        },
    });
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const productSingle = getProduct(id);
    const [productData]: [Res<Product>] = await Promise.all([productSingle]);
    const product = productData.data;

    const o='2024-04-23T14:07:17.794Z'
    const date1 = new Date(o);
    const now= new Date()
    const differenceMs = now.getTime() - date1.getTime();
    console.log(differenceMs/1000 )

   
    

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
                                    {!product?.discount && (
                                        <div className="text-neutral-4/80 relative text-2xl">
                                            ${product?.price}
                                            <span className="w-full absolute h-0.25 bg-neutral-4/80 left-0 top-4 "></span>
                                        </div>
                                    )}
                                </div>
                                <Timer  />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
