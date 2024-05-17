import { Product } from "@/types/product";
import { limitText } from "@/utils/limitText";
import Image from "next/image";
import Link from "next/link";

export default function ProductSingle({ product }: { product: Product }) {
	return (
		<div className="flex items-center gap-6">
			<Image className="h-full" src={product?.featuredImage} alt={product?.title} width={120} height={161} />
			<div className="flex flex-col items-start gap-2 py-6">
				<div className="flex gap-4">
					<div className="text-neutral-7 text-lg font-semibold whitespace-nowrap">{product?.title}</div>
				</div>
				<div className="flex gap-4 justify-center items-center">
					{product?.price !== product?.priceWithDiscount && (
						<div className="text-neutral-5 relative text-sm opacity-70">
							${product?.price}
							<div className="h-0.25 w-[140%] absolute bg-neutral-5 top-2 -left-[20%]"></div>
						</div>
					)}
					<div className="text-neutral-7 font-semibold">${product?.priceWithDiscount}</div>
				</div>
				<div className="flex gap-4">
					<div className="text-neutral-5/70 text-sm">{limitText(product?.additionalInfo, 170)}</div>
				</div>
			</div>
		</div>
	);
}
