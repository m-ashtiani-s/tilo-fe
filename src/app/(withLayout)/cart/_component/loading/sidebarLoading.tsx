

export default function CartSummaryLoading() {
	return (
		<div className="flex flex-col rounded-lg border border-1 border-neutral-6 p-6 animate-pulse ">
			<div className="flex flex-col gap-3">
				<div className="h-[50px] w-full bg-gray-300 rounded "></div>
				<div className="h-[50px] w-full bg-gray-300 rounded "></div>
				<div className="h-[50px] w-full bg-gray-300 rounded "></div>
			</div>
			<div className="flex justify-between pt-6 pb-3 border-b border-neutral-5/30 text-neutral-7">
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
			</div>
			<div className="flex justify-between text-neutral-7 py-3">
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
			</div>
			<div className="h-10 w-full bg-gray-300 rounded mt-6"></div>
		</div>
	);
}
