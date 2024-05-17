export default function CheckoutSummaryLoading() {
	return (
		<div className="flex flex-col rounded-lg border border-1 border-neutral-6 p-6 animate-pulse">
			<div className="flex flex-col">
				<div className="flex py-6 border-b border-neutral-5/30 items-start justify-between">
					<div className="flex items-center gap-6">
						<div className="h-[106px] w-20 flex items-center justify-center bg-gray-200 rounded ">
							<svg
								className="w-10 h-10 text-gray-300 dark:text-gray-600"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 18"
							>
								<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
							</svg>
						</div>
						<div className="flex flex-col items-start gap-2">
							<div className="h-4 w-16 bg-gray-300 rounded "></div>
							<div className="h-10 w-12 bg-gray-300 rounded "></div>
							<div className="flex gap-4 justify-center items-center">
								<div className="h-4 w-16 bg-gray-300 rounded "></div>
								<div className="h-4 w-16 bg-gray-300 rounded "></div>
							</div>
						</div>
					</div>

					<div className="flex w-2/12 flex-col gap-2 justify-center items-center">
						<div className="h-4 w-16 bg-gray-300 rounded "></div>
						<div className="h-4 w-16 bg-gray-300 rounded "></div>
					</div>
				</div>
			</div>
			<div className="flex justify-between pt-6 pb-3 border-b border-neutral-5/30 text-neutral-7">
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
				<div className="text-sm font-semibold">
					<div className="h-4 w-16 bg-gray-300 rounded "></div>
				</div>
			</div>
			<div className="flex justify-between py-3 pb-3 border-b border-neutral-5/30 text-neutral-7">
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
			</div>
			<div className="flex justify-between text-neutral-7 py-3">
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
				<div className="h-4 w-16 bg-gray-300 rounded "></div>
			</div>
		</div>
	);
}
