"use client";

import { Routs } from "@/types/routs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { IconArrow, IconArrowRight, IconBasket, IconClose, IconLike, IconLogout } from "../../icon/icons";
import { signOut } from "next-auth/react";
import { userInSession } from "@/types/session";

const UserMenu = ({ setOpen,user }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>,user:userInSession }) => {
	const addressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (addressRef.current && !addressRef?.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	async function Logout() {
		await signOut();
	}
	return (
		<div className="flex flex-col absolute -right-28 top-4 w-64" ref={addressRef}>
			<div className="flex items-center gap-8 bg-none flex-col-reverse h-8"></div>
			<div className="flex flex-col bg-neutral-2 shadow  rounded">
				<Link href="/" className="flex justify-between py-6 px-4 border-b border-b-neutral-4/25 w-full">
					<div className="text-neutral-6">{user?.name}</div>
					<IconArrow strokeWidth={0} fill="black" className="-rotate-90" />
				</Link>
				<div className="flex-col flex">
					<Link
						href="/"
						className="flex py-4  px-6 w-full text-sm items-center gap-3"
					>
						<IconBasket stroke="black" />
						<div className="text-neutral-6">Cart</div>
						
					</Link>
					<div className="border-b border-b-neutral-4/25 w-[84%] mx-auto"></div>
					<Link
						href="/"
						className="flex py-4  px-6 w-full text-sm items-center gap-3"
					>
						<IconLike stroke="black" />
						<div className="text-neutral-6">Your Likes</div>
						
					</Link>
					<div className="border-b border-b-neutral-4/25 w-[84%] mx-auto"></div>
					<div
						onClick={Logout}
						className="flex py-4  px-6 w-full text-sm items-center gap-3 cursor-pointer"
					>
						<IconLogout className=" relative -left-0.5" stroke="black" />
						<div className="text-neutral-6">Logout</div>
						
					</div>

				</div>
			</div>
		</div>
	);
};

export default UserMenu;
