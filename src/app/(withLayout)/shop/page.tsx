"use client";

import ProductCart from "@/app/_components/productCart/productCart";
import { API_URL } from "@/configs/global";
import { readData } from "@/core/http-service/http-service";
import { Paginate } from "@/types/paginate";
import { Product } from "@/types/product";
import { Res } from "@/types/responseType";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "@/stores/session";
import { Session } from "@/types/session";
import Filter from "./_components/filter";
import { getPageNumbers, getPageNumbersB } from "@/utils/pageArray";
import Pagination from "./_components/pagination";
import CartLoading from "@/app/_components/productCart/loadings/cartLoading";
import PaginationLoading from "./_components/loadings/paginationLoading";
interface PriceRange {
	min: number;
	max: number;
}

export default function Page() {
	const { session }: { session: Session | null } = useSessionStore();
	const [products, setProducts] = useState<Paginate<Product> | null>(null);
	const [likedProducts, setLikedProducts] = useState<Product[]>([]);
	const [categorySelected, setCategorySelected] = useState<string>("");
	const [values, setValues] = useState<PriceRange | null>(null);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPagesize] = useState<number>(4);
	const prevValues = useRef(values);
	const prevCategorySelected = useRef(categorySelected);
	const prevPage = useRef(page);
	const [loading, setLoading] = useState<boolean>(true);

	const mount = useRef<boolean>(false);

	useEffect(() => {
		mount.current = true;
	}, []);
	useEffect(() => {
		if (!!mount.current) {
			getLikedProducts();
		}
	}, [mount]);
	useEffect(() => {
		if (!!mount.current) {
			if (prevCategorySelected.current !== categorySelected || prevValues.current !== values) {
				getProducts(pageSize, 1, categorySelected, values?.min, values?.max);
				setPage(1);
			} else {
				getProducts(pageSize, page, categorySelected, values?.min, values?.max);
			}
			prevValues.current = values;
			prevCategorySelected.current = categorySelected;
		}
	}, [prevPage.current, pageSize, values, categorySelected]);

	const getProducts = async (limit?: number, page?: number, id?: string, minPrice?: number, maxPrice?: number) => {
		try {
			setLoading(true);
			const res = await readData<Res<Paginate<Product>>>(`${API_URL}/v1/products`, {
				...(!!id ? { category: id } : null),
				...(!!minPrice ? { minPrice: minPrice } : null),
				...(!!maxPrice ? { maxPrice: maxPrice } : null),
				limit: limit,
				page: page,
			});
			!!res.data && setProducts(res?.data);
		} catch (error) {
			console.log("error: ", error);
		} finally {
			setLoading(false);
		}
	};

	const getLikedProducts = async () => {
		try {
			const res = await readData<Res<Product[]>>(`${API_URL}/v1/liked-products`);

			!!res.data && setLikedProducts(res.data);
		} catch (error) {
			console.log("error: ", error);
		} finally {
		}
	};

	return (
		<>
			<section className="h-140">
				<div className="bg-[url('/images/hero.jpg')] bg-cover h-full bg-center relative after:w-full after:h-full after:bg-neutral-7 after:absolute after:top-0 after:left-0 after:opacity-70 after:z-10">
					<div className="container h-full relative z-20 ">
						<div className="flex justify-center items-center h-full flex-col gap-12">
							<div className="flex text-neutral-3/80 gap-6">
								<Link href="./">Home</Link>
								{">"}
								<Link href="/shop" className="text-white">
									Shop
								</Link>
							</div>
							<div className="text-[58px] text-neutral-2">Shop Page</div>
							<div className="text-[20px] text-neutral-2/70">
								Let’s design the place you always imagined.
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="mt-10">
				<div className="container">
					<div className="flex gap-6">
						<div className="w-3/12">
							<Filter
								categorySelected={categorySelected}
								setCategorySelected={setCategorySelected}
								setPriceValues={setValues}
								pageSize={pageSize}
								getProducts={getProducts}
								setPage={setPage}
							/>
						</div>
						<div className="w-9/12">
							<div className="flex flex-wrap">
								{!!products && !loading ? (
									products?.elements?.map((product) => (
										<div className="w-4/12 p-3">
											<ProductCart
												product={product}
												likedProducts={likedProducts}
												loggedIn={!!session}
											/>
										</div>
									))
								) : loading ? (
									<>
										<CartLoading />
										<CartLoading />
										<CartLoading />
										<CartLoading />
									</>
								) : (
									<>no product</>
								)}
							</div>
							{!!products && !loading ? (
								<Pagination
									prevPage={prevPage}
									page={page}
									setPage={setPage}
									totalPages={products?.totalPages}
								/>
							) : loading ? (
								<PaginationLoading />
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
