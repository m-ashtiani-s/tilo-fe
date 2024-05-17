"use client";

import { useState, useEffect, useRef } from "react";
import { Routs } from "@/types/routs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaMenu from "./_components/megaMenu";
import {
	IconArrow,
	IconArrowRight,
	IconBasket,
	IconChevronDown,
	IconDiscount,
	IconHamburger,
	IconSearch,
	IconUser,
} from "../icon/icons";
import UserMenu from "./_components/userMenu";
import UserLoginMenu from "./_components/loginMenu";
import { useCartStore } from "@/stores/cart.store";
import { routs } from "@/data/routs";
import { useSessionStore } from "@/stores/session";
import { Cart } from "@/types/cart";
import { Session } from "@/types/session";
import CartMenu from "./_components/cartMenu";
import { Search } from "../search/search";

export const Header: React.FC = () => {
	const { cart }: { cart: Cart | null } = useCartStore();
	const { session }: { session: Session | null } = useSessionStore();
	const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
	const [cartMenuOpen, setCartMenuOpen] = useState<boolean>(false);
	const [searchOpen,setSearchOpen]=useState<boolean>(false)
	const pathname = usePathname();

	let [open, setOpen] = useState(false);
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

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<>
		<Search open={searchOpen} setOpen={setSearchOpen}/>
			<div className="h-10 bg-neutral-2 hidden lg:block">
				<div className="container h-full">
					<div className="flex justify-center h-full items-center gap-3">
						<div className="">
							<IconDiscount fill="#28303F" strokeWidth={0} />
						</div>
						<div className="font-mediun text-neutral-7">30% off storewide — Limited time!</div>
						<Link className="flex items-center gap-2 text-secondary-blue font-medium" href="./shop">
							Shop Now{" "}
							<IconArrowRight
								fill="#377DFF"
								strokeWidth={0}
								width={14}
								className="flex items-center"
								viewBox="0 0 14 9"
							/>
						</Link>
					</div>
				</div>
			</div>
			<header
				className={`hidden lg:flex w-full items-center h-16 mx-auto duration-200 z-50 sticky top-0 bg-white shadow  ${""}`}
			>
				<div className="container">
					<div className="flex justify-between items-center">
						<div className="text-neutral-7 gap-2 text-2xl font-semibold flex items-center w-2/12">
							<Image src="/images/logo.svg" width={48} height={24} alt="لوگو" />
							Tilo
						</div>
						<div className="w-8/12">
							<ul className="mr-4 flex flex-row items-center gap-8 justify-center">
								{routs.map((item) => (
									<li key={item.href} className="relative ">
										<Link
											className={` hover:text-secondary-green transition flex gap-1 items-center ${
												item.href !== "/" && pathname.includes(item.href)
													? "text-secondary"
													: item.href == "/" && pathname == item.href
													? "text-neutral-7 font-medium"
													: "text-neutral-4"
											}`}
											href={!item?.subRoute ? item?.href : "#"}
										>
											{item.title}
										</Link>
										{!!item?.subRoute && !!item?.isOpen && <MegaMenu subRoute={item?.subRoute} />}
									</li>
								))}
							</ul>
						</div>
						<div className="w-2/12">
							<div className="flex items-center gap-4 justify-end">
								<div className="">
									<IconSearch stroke="#28303F" strokeWidth={1.5} className="cursor-pointer" onClick={()=>setSearchOpen(true)} />
								</div>
								{!!session ? (
									<div className="flex relative">
										<div
											className="flex cursor-pointer relative"
											onClick={() => setUserMenuOpen(true)}
										>
											<IconUser stroke="#28303F" strokeWidth={1.5} />
											<IconChevronDown strokeWidth={0} fill="#4f4f4f" width={18} />
										</div>
										{userMenuOpen && <UserMenu user={session?.user?.user} setOpen={setUserMenuOpen} />}
									</div>
								) : (
									<div className="flex relative">
										<div
											className="flex cursor-pointer relative"
											onClick={() => setUserMenuOpen(true)}
										>
											<IconUser stroke="#28303F" strokeWidth={1.5} />
											<IconChevronDown strokeWidth={0} fill="#4f4f4f" width={18} />
										</div>
										{userMenuOpen && <UserLoginMenu setOpen={setUserMenuOpen} />}
									</div>
								)}
								<div className="flex items-center gap-2 relative">
									{!!session && (
										<>
											<IconBasket stroke="#28303F" strokeWidth={1.5} onClick={() => setCartMenuOpen(true)} />
											<span className="bg-neutral-7 rounded-full w-5 h-5 flex items-center justify-center text-white absolute text-xs -right-2 -top-2">
												{cart?.products?.length || 0}
											</span>
											{cartMenuOpen && <CartMenu setOpen={setCartMenuOpen} />}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div className=" w-full fixed top-0 left-0 z-50 block lg:hidden">
				{open && (
					<div
						className={`w-full h-screen bg-black/80 z-[60] fixed transition-all duration-300 ease-in-out ${
							open ? "opacity-100 shadow-md" : "opacity-0"
						}`}
					></div>
				)}
				<div
					className={`md:flex items-center justify-between ${"bg-primary shadow-md"} py-4 md:px-10 px-7 duration-200 flex items-center z-50 relative`}
				>
					<div onClick={() => setOpen(!open)} className="cursor-pointer">
						<IconHamburger strokeWidth={0} fill="white" width={32} height={32} />
					</div>
					<div>
						<Image src="/images/logo.png" width={64} height={24} alt="لوگو"></Image>
					</div>
				</div>

				<div
					ref={addressRef}
					className={`h-screen pb-12 absolute top-0 left-0 w-8/12  transition-all duration-300 ease-in-out bg-neutral z-[60] ${
						open ? "left-0 " : "left-[-700px]"
					}`}
				>
					<div className="flex flex-col">
						<div className="px-4 py-2 border-b border-primary/60 flex items-center justify-between bg-primary">
							<div className="text-neutral-7 text-2xl font-semibold flex items-center">
								<Image src="/images/logo.png" width={48} height={24} alt="لوگو"></Image>
								Tilo
							</div>
							<div>auth</div>
						</div>
						<div className="flex justify-center mt-6 px-6">
							<input
								type="text"
								placeholder="جستجوی محصولات لوتوس"
								className="py-2 px-4 w-full mx-auto rounded placeholder:text-sm text-sm"
							/>
						</div>
						<div className="mt-10">
							<div className="font-bold text-primary border-b border-primary/30 pb-2  px-6">
								صفحات اصلی سایت
							</div>
						</div>
						<div className="mt-10 px-6">
							<div className="font-bold text-primary border-b border-primary/30 pb-2">برنامه ها</div>
							<div className="flex flex-col gap-3 text-sm mt-3">
								<div className="relative ">
									<Link href="/" className={`text-neutral-content`}>
										برنامه LiftPart
									</Link>
								</div>
								<div className="relative ">
									<Link href="/" className={`text-neutral-content`}>
										برنامه LiftAxe
									</Link>
								</div>
								<div className="relative ">
									<Link href="/" className={`text-neutral-content`}>
										برنامه LiftForm
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
