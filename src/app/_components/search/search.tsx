"use client";
import { motion } from "framer-motion";
import Input from "../input/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";
import { Res } from "@/types/responseType";
import { Paginate } from "@/types/paginate";
import { Product } from "@/types/product";
import { API_URL } from "@/configs/global";
import { readData } from "@/core/http-service/http-service";
import ProductSingle from "./_components/productSingle";
import Link from "next/link";

export const Search: React.FC<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({
	open,
	setOpen,
}) => {
	const [term, setTerm] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [hiden, setHiden] = useState<boolean>(false);
	const [products, setProducts] = useState<Paginate<Product> | null>(null);

	const boxMotions = {
		initial: { opacity: 0 },
	};

	const transitionProps = {
		duration: 0.2,
		scale: {
			type: "spring",
			damping: 50,
			stiffness: 400,
		},
	};

	const hide = {
		opacity: 0,
		transitionEnd: {
			display: "none",
		},
	};

	const show = {
		opacity: 1,
		display: "block",
	};

	const changeHandler = (e: any) => {
		setTerm(e?.target?.value);
		e?.target?.value?.length > 0 ? getProducts(100, 1, e?.target?.value) : setProducts(null);
	};

	const getProducts = async (limit?: number, page?: number, term?: string) => {
		try {
			setLoading(true);
			const res = await readData<Res<Paginate<Product>>>(`${API_URL}/v1/products`, {
				...(!!term ? { title: term } : null),
				limit: limit,
				page: page,
			});
			!!res.data && setProducts(res?.data);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(()=>{
		if(!open){
			setTimeout(()=>{setHiden(!open)},400)
		}else{
			setTimeout(()=>{setHiden(!open)},1)
		}
	},[open])

	return (
		<>
			{!hiden && (
				<motion.div
					variants={boxMotions}
					initial="initial"
					animate={!!open ? show : hide}
					transition={transitionProps}
					className="w-full h-screen bg-black/60 fixed z-[100] top-0 left-0 search"
				>
					<div
						onClick={() => setOpen(false)}
						className="w-full h-screen absolute z-[100] top-0 left-0 "
					></div>

					<motion.div
						onClick={(e) => e.preventDefault()}
						initial={{ opacity: 1, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							delay: 0.2,
							duration: 0.2,
							scale: {
								type: "spring",
								damping: 50,
								stiffness: 400,
							},
						}}
						className="bg-white p-8 rounded-lg w-8/12 absolute h-[80vh] left-[16.667%] top-[10vh] z-[101]"
					>
						<div className="flex gap-4 w-full flex-col">
							<div className="">Serach in Tilo:</div>
							<Input
								onChange={changeHandler}
								value={term}
								className="w-full"
								setValue={setTerm}
								placeholder="search in Tilo"
							/>
							<div className="h-[380px] overflow-auto p-4 pt-0 border border-1 border-neutral-5/20 rounded">
								{!!products && !loading ? (
									<>
										{products?.elements?.length > 0 ? (
											products?.elements?.map((product) => (
												<Link
													onClick={() => setOpen(false)}
													href={`/shop/${product?._id}`}
													className="flex border duration-200  border-neutral-5/30 items-start justify-between hover:border-neutral-5/60 hover:shadow mt-4 rounded"
												>
													<ProductSingle product={product} />
												</Link>
											))
										) : (
											<div className="flex gap-4 items-center justify-center h-full">
												<img src="/images/search.svg" alt="" className="w-12 opacity-60" />
												No Product Found!
											</div>
										)}
									</>
								) : loading ? (
									<div className="flex space-x-2 justify-center items-center bg-white h-full dark:invert">
										<span className="sr-only">Loading...</span>
										<div className="h-3 w-3 bg-neutral-4 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
										<div className="h-3 w-3 bg-neutral-4 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
										<div className="h-3 w-3 bg-neutral-4 rounded-full animate-bounce"></div>
									</div>
								) : (
									<div className="flex gap-4 items-center justify-center h-full">
										<img src="/images/search.svg" alt="" className="w-12 opacity-60" />
										start typing to search!
									</div>
								)}
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</>
	);
};
