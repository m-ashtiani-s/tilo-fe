"use client";

import { Routs } from "@/types/routs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { IconArrow, IconArrowRight, IconBasket, IconClose, IconLike, IconLogin, IconLogout } from "../../icon/icons";
import { signOut } from "next-auth/react";
import Image from "next/image";

const UserLoginMenu = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const addressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			console.log("ghgh");
			if (addressRef.current && !addressRef?.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex flex-col absolute -right-28 top-4 w-64" ref={addressRef}>
			<div className="flex items-center gap-8 bg-none flex-col-reverse h-8"></div>
			<div className="flex flex-col bg-neutral-2 shadow  rounded">
				<div className="flex justify-between py-6 px-4 border-b border-b-neutral-4/25 w-full">
					<div className="text-neutral-6 text-center w-full flex items-center justify-center">
						wellcome to
						<div className="text-neutral-7 gap-1 text-lg font-semibold flex items-center w-2/12">
							<Image src="/images/logo.svg" width={24} height={12} alt="لوگو" />
						</div>
					</div>
				</div>
				<div className="flex-col flex">
					<Link href="/login" className="flex py-4  px-6 w-full text-sm items-center gap-3 cursor-pointer">
						<IconLogin className=" relative -left-0.5" stroke="black" />
						<div className="text-neutral-6">Sign In/Up</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserLoginMenu;
