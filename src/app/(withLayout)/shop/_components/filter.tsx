"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./filter.css";
import { API_URL } from "@/configs/global";
import { Res } from "@/types/responseType";
import { readData } from "@/core/http-service/http-service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PriceRange {
	min: number;
	max: number;
}

type Catrgory = {
	id: string;
	name: string;
};

interface IProps {
	getProducts: any;
	pageSize: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setCategorySelected: React.Dispatch<React.SetStateAction<string>>;
	setPriceValues: React.Dispatch<React.SetStateAction<PriceRange | null>>;
	categorySelected: string;
}

export default function Filter({
	getProducts,
	pageSize,
	setPage,
	categorySelected,
	setCategorySelected,
	setPriceValues,
}: IProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// const [categorySelected, setCategorySelected] = useState<string>("");
	const [changeTrace, setChangeTrace] = useState<string>("");
	const [categories, setCategories] = useState<Catrgory[]>([]);
	const [values, setValues] = useState<PriceRange>({ min: 0, max: 500 });
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const categoryUrl = searchParams.get("category");
		const minPriceUrl = searchParams.get("minPrice");
		const maxPriceUrl = searchParams.get("maxPrice");

		!!minPriceUrl && setValues((prev: PriceRange) => ({ ...prev, min: parseInt(minPriceUrl) }));
		!!maxPriceUrl && setValues((prev: PriceRange) => ({ ...prev, max: parseInt(maxPriceUrl) }));
		!!categoryUrl && setCategorySelected(categoryUrl);
	}, []);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const changeCategory = (id: string) => {
		if (id == categorySelected) {
			setCategorySelected("");
			router.push(pathname + "?" + createQueryString("category", ""), { scroll: false });
		} else {
			setCategorySelected(id);
			router.push(pathname + "?" + createQueryString("category", id), { scroll: false });
		}
	};

	const handleChange = (value: any) => {
		if (value?.max === values.max) {
			setChangeTrace("min");
		} else {
			setChangeTrace("max");
		}
		setValues(value);
	};
	const handlePriceFilter = (value: any) => {
		if (changeTrace === "min") {
			router.push(pathname + "?" + createQueryString("minPrice", value?.min?.toString()), { scroll: false });
		} else {
			router.push(pathname + "?" + createQueryString("maxPrice", value?.max?.toString()), { scroll: false });
		}

		setPriceValues({ min: value?.min, max: value?.max });
	};

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
		try {
			setLoading(true);
			const res = await readData<Res<Catrgory[]>>(`${API_URL}/v1/categories`);
			!!res.data && !!res?.success && setCategories(res?.data);
		} catch (error) {
			console.log("error: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="text-neutral-7 ">
			<div className="flex gap-1 items-center font-medium text-neutral-7 text-lg">
				<img src="/images/filter.svg" alt="" />
				Filter
			</div>
			<div className="mt-8">
				<div className="mb-4 font-medium">CATEGORIES</div>
				<div className="flex flex-col gap-3 items-start">
					{!!categories && !loading ? (
						<>
							{categories?.map((category) => (
								<div
									className={`border-b-2 pb-0.5 text-sm cursor-pointer duration-200 ${
										category?.id === categorySelected
											? "text-neutral-7 border-neutral-7 font-medium"
											: "text-neutral-4 border-neutral-7/0"
									}`}
									key={category?.id}
									onClick={() => changeCategory(category?.id)}
								>
									{category?.name}
								</div>
							))}
						</>
					) : loading ? (
						<>
							<div className="h-6 w-32 bg-gray-300 rounded  opacity-80 animate-pulse "></div>
							<div className="h-6 w-32 bg-gray-300 rounded  opacity-80 animate-pulse "></div>
							<div className="h-6 w-32 bg-gray-300 rounded  opacity-80 animate-pulse "></div>
						</>
					) : (
						<>no cat</>
					)}
				</div>
			</div>
			<div className="h-0.25 bg-neutral-4/15 my-8"></div>
			<div className="mb-4 font-medium">PRICE RANGE</div>
			<div>
				<div className="w-11/12 mx-auto">
					<InputRange
						draggableTrack
						minValue={0}
						maxValue={500}
						step={1}
						value={values}
						onChange={handleChange}
						onChangeComplete={handlePriceFilter}
					/>
				</div>
				<div className="mt-6 text-sm">
					Min Price: <span className="font-medium">${values.min}</span>
				</div>
				<div className="mt-1 text-sm">
					Max Price: <span className="font-medium">${values.max}</span>
				</div>
			</div>
		</div>
	);
}
