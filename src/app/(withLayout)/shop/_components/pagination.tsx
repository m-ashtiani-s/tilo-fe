"use client";

import { getPageNumbers, getPageNumbersB } from "@/utils/pageArray";

type IProps={
	page:number,totalPages:number,setPage:React.Dispatch<React.SetStateAction<number>>
	prevPage:any
}

export default function Pagination({ page,totalPages,setPage,prevPage }: IProps) {
	return (
		<div className="flex gap-4 justify-center pt-4 mb-10 border-t border-neutral-4/40 mt-6">
			{
				totalPages <= 5 &&
				getPageNumbers(totalPages)?.map((item, index) => (
					<div
						className={`h-7 w-7 rounded-md border border-neutral-6 flex items-center justify-center cursor-pointer  duration-200 ${
							item === page ? "bg-neutral-6 text-white" : "text-neutral-6 hover:bg-neutral-4/20"
						}`}
						onClick={() => {setPage(item);prevPage.current=item}}
					>
						{item}
					</div>
				))}
			{ totalPages > 5 && (
				<>
					{page >= 4 && (
						<>
							<div
								className={`h-7 w-7 rounded-md border border-neutral-6 flex items-center justify-center cursor-pointer  duration-200 ${"text-neutral-6 hover:bg-neutral-4/20"}`}
								onClick={() => {setPage(1);prevPage.current=1}}
							>
								1
							</div>
							{page !== 4 && "..."}
						</>
					)}
					{getPageNumbersB(totalPages, page)?.map((item, index) => (
						<div
							className={`h-7 w-7 rounded-md border border-neutral-6 flex items-center justify-center cursor-pointer  duration-200 ${
								item === page ? "bg-neutral-6 text-white" : "text-neutral-6 hover:bg-neutral-4/20"
							}`}
							onClick={() => {setPage(item);prevPage.current=item}}
						>
							{item}
						</div>
					))}
					{page < totalPages - 2 && (
						<>
							{page !== totalPages - 3 && "..."}
							<div
								className={`h-7 w-7 rounded-md border border-neutral-6 flex items-center justify-center cursor-pointer  duration-200 ${"text-neutral-6 hover:bg-neutral-4/20"}`}
								onClick={() => {setPage(totalPages);prevPage.current=totalPages}}
							>
								{totalPages}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
