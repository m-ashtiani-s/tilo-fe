"use client";

export default function ProductLoading() {
	return (
		<section className=" animate-pulse opacity-40">
			<div className="container">
				<div className="flex gap-16 py-16">
					<div className="w-4/12">
						<div>
							<div className="relative">
								<div className="h-[548px] w-full flex items-center justify-center bg-gray-200 rounded ">
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

								<span className="absolute text-neutral-7 leading-4  rounded  top-4 left-4 text-sm font-semibold">
									<div className="h-6 w-48 bg-gray-300 rounded "></div>
								</span>
							</div>
						</div>
					</div>
					<div className="w-8/12">
						<div>
							<div className="flex gap-2 items-center mb-4">
								<div className="h-6 w-[66px] bg-gray-300 rounded "></div>
								<div className="h-6 w-[58px] bg-gray-300 rounded "></div>
							</div>
							<div className="h-12 w-4/12 bg-gray-300 rounded "></div>
							<div className="flex flex-col gap-1 mt-4">
								<div className="h-6 w-full bg-gray-300 rounded "></div>
								<div className="h-6 w-full bg-gray-300 rounded "></div>
								<div className="h-6 w-10/12 bg-gray-300 rounded "></div>
							</div>
							<div className="mt-4  flex gap-4 items-center font-medium">
								<div className="h-10 w-24 bg-gray-300 rounded "></div>
								<div className="h-8 w-16 bg-gray-300 rounded "></div>
							</div>
							<div className="w-10/12 bg-neutral-4/20 h-0.25 my-6"></div>
							<div className="flex flex-col gap-2">
								<div className="h-4 w-24 bg-gray-300 rounded "></div>
								<div className="h-6 w-48 bg-gray-300 rounded "></div>
							</div>
							{/* <div className="flex flex-col gap-2 mt-4">
                                    <div className=" text-neutral-4 font-medium flex items-center">
                                        Choose Color <IconArrow strokeWidth={0} fill="rgb(108 114 117)" className="r -rotate-90" />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="w-8 h-8 rounded-full bg-secondary-green"></span>
                                        <span className="w-8 h-8 rounded-full bg-secondary-red"></span>
                                        <span className="w-8 h-8 rounded-full bg-secondary-blue"></span>
                                        <span className="w-8 h-8 rounded-full bg-secondary-orange"></span>
                                    </div>
                                </div> */}
							<div className="mt-8 flex gap-4">
								<div className="h-10 w-2/12 bg-gray-300 rounded "></div>
								<div className="h-10 w-10/12 bg-gray-300 rounded "></div>
							</div>
							<div className="mt-4 flex gap-4">
								<div className="h-10 w-full bg-gray-300 rounded "></div>
							</div>
							<div className="w-10/12 bg-neutral-4/20 h-0.25 my-6"></div>
							<div className="flex  gap-12">
								<div className="h-4 w-24 bg-gray-300 rounded "></div>
								<div className="h-4 w-48 bg-gray-300 rounded "></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
