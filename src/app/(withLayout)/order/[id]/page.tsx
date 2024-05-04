import { auth } from "@/auth";
import { API_URL } from "@/configs/global";
import moment from "moment-timezone";
import { getSession } from "next-auth/react";
import Image from "next/image";

async function getToken() {
	const session = await auth();
	if (session) {
		return `${session.user.accessToken}`;
	} else {
		return "";
	}
}
async function getCourseDetails(slug: string) {
	console.log("gghhgghh", await getToken());
	const res = await fetch(`${API_URL}/v1/order/${slug}`, {
		headers: {
			token: (await getToken()) || "",
		},
		next: {
			revalidate: 24 * 60 * 60,
		},
	});
	if (!res.ok) {
		throw new Error(`Failed to fetch course details: ${res.statusText}`);
	}
	return res.json();
}

export default async function Orders({ params }: { params: { id: string } }) {
	const { id } = params;
	const orderData = getCourseDetails(id);
	const [order]: [any] = await Promise.all([orderData]);

    let dec = moment(order?.data?.createdAt);
	const orderTime= dec.tz("Asia/Tehran").format('MMMM DD , YYYY');
	return (
		<>
			<section className="my-20">
				<div className="container h-full">
					<div className="w-[70%] flex flex-col gap-10 items-center mx-auto">
						<div className="text-5xl text-neutral-7 font-medium">Complete!</div>
						<div className="flex gap-8 justify-center w-full">
							<div className="flex gap-4 pb-6 border-b-2 border-b-secondary-green w-4/12 items-center">
								<div className="min-w-11 h-11 rounded-full flex items-center justify-center bg-secondary-green text-white">
									<img src="/images/tick.svg" alt="" />
								</div>
								<div className=" text-secondary-green whitespace-nowrap">Shopping cart</div>
							</div>
							<div className="flex gap-4 pb-6 border-b-2 border-b-secondary-green w-4/12 items-center">
								<div className="min-w-11 h-11 rounded-full flex items-center justify-center bg-secondary-green text-white">
									<img src="/images/tick.svg" alt="" />
								</div>
								<div className=" text-neutral-7 whitespace-nowrap">Checkout details</div>
							</div>
							<div className="flex gap-4 pb-6 border-b-2 border-b-neutral-7 w-4/12 items-center">
								<div className="min-w-11 h-11 rounded-full flex items-center justify-center bg-neutral-7 text-white">
									3
								</div>
								<div className=" text-neutral-7 whitespace-nowrap">Order complete</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="pb-40">
				<div className="container">
					<div className="w-8/12 p-16 bg-white rounded-lg shadow-lg mx-auto">
						<div className="text-center text-neutral-4 text-2xl">Thank you! 🎉</div>
						<div className="text-center text-neutral-6 text-4xl mt-6 font-medium">
							Your order has been received
						</div>
						<div className="flex gap-14 flex-wrap flex-row justify-center mt-14">
                            
							{order?.data?.products?.map((product: any) => (
								<div className="relative w-fit">
									<Image src={product?.featuredImage} height={96} width={80} alt="product" />
                                    <span className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-white absolute text-sm -right-3 -top-3">
										{product?.quantity}
									</span>
								</div>
							))}
						</div>

                        <div className="w-6/12 mx-auto mt-16">
                            <div className="flex justify-between">
                                <div className="text-neutral-5/60 w-6/12">Order code:</div>
                                <div className="text-neutral-7 w-6/12 font-medium">{order?.data?._id}</div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="text-neutral-5/60 w-6/12">Date:</div>
                                <div className="text-neutral-7 w-6/12 font-medium">{orderTime}</div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="text-neutral-5/60 w-6/12">Total:</div>
                                <div className="text-neutral-7 w-6/12 font-medium">{order?.data?.orderSumWithDiscount}</div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="text-neutral-5/60 w-6/12">Payment method:</div>
                                <div className="text-neutral-7 w-6/12 font-medium">{order?.data?.paymentMethod}</div>
                            </div>
                        </div>
					</div>
				</div>
			</section>
		</>
	);
}
