"use client";

import { Routs } from "@/types/routs";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface IProps{
	subRoute:Omit<Routs,'isOpen' | 'subRoute'>[]
}

const MegaMenu: React.FC<IProps> = ({subRoute}) => {
	const pathname = usePathname();
	return (
		<div className="flex flex-col absolute -right-16 top-4 w-64 ">
			<ul className="flex items-center gap-8 bg-none flex-col-reverse h-10">
				<img src="/images/triangle.svg" alt="" className="w-6" />
			</ul>
			<ul className="flex items-center gap-8 bg-primary flex-col px-4 py-6 rounded">
				{subRoute.map((item) => (
					<li key={item.href} className="">
						<Link className={` hover:text-secondary transition ${item.href === pathname ? "text-secondary" : 'text-white'}`} href={item.href}>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MegaMenu;
