'use client'

import { useSearchParams } from "next/navigation"
import CheckoutBody from "../checkoutBody";
import CartSummary from "../cartSummary";




  
    
export default function CheckoutPage() {
    const searchParams = useSearchParams()
 
  const shipping = searchParams.get('shipping')
	return (
		<>
			<section className="my-20">
				<div className="container h-full">
					<div className="w-[70%] flex flex-col gap-10 items-center mx-auto">
                        <div className="text-5xl text-neutral-7 font-medium">Cart</div>
                        <div className="flex gap-8 justify-center w-full">
                            <div className="flex gap-4 pb-6 border-b-2 border-b-secondary-green w-4/12 items-center">
                                <div className="min-w-11 h-11 rounded-full flex items-center justify-center bg-secondary-green text-white"><img src="/images/tick.svg" alt="" /></div>
                                <div className=" text-secondary-green whitespace-nowrap">Shopping cart</div>
                            </div>
                            <div className="flex gap-4 pb-6 border-b-2 border-b-neutral-7 w-4/12 items-center">
                                <div className="min-w-11 h-11 rounded-full flex items-center justify-center bg-neutral-7 text-white">2</div>
                                <div className=" text-neutral-7 whitespace-nowrap">Checkout details</div>
                            </div>
                            <div className="flex gap-4 pb-6 border-b-2 border-b-neutral-7/0 w-4/12 items-center opacity-30">
                                <div className="min-w-11 h-11 rounded-full flex items-center justify-center bg-neutral-7 text-white">3</div>
                                <div className=" text-neutral-7 whitespace-nowrap">Order complete</div>
                            </div>
                        </div>
                    </div>
				</div>
			</section>
			<section className="pb-40">
				<div className="container">
					<div className="flex gap-16">
                        <div className="w-8/12">
                            
                            <CheckoutBody />
                        </div>
                        <div className="w-4/12"><CartSummary shipping={shipping} /></div>
                    </div>
				</div>
			</section>
			
		</>
	);
}
