"use client";

import { QuantityProps } from "./quantity.types";


export const Quantity: React.FC<QuantityProps>=({quantity,setQuantity})=>{
    const increamentHandler=()=>{
        setQuantity((prev)=>prev+1)
    }
    const decreamentHandler=()=>{
        quantity>1 && setQuantity((prev)=>prev-1)
    }

	return (
		<div className="flex py-3 px-6 justify-between gap-2 bg-[#F5F5F5] text-neutral-4">
			<span className="p-1 cursor-pointer" onClick={decreamentHandler}>
				-
			</span>
			<span className="p-1">{quantity}</span>
			<span className="p-1 cursor-pointer" onClick={increamentHandler}>
				+
			</span>
		</div>
	);
}
