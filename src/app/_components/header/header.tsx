"use client";

import { useState, useEffect, useRef } from "react";
import { Routs } from "@/types/routs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MegaMenu from "./_components/megaMenu";
import { IconBasket, IconMoney, IconTruck } from "../icon/icons";

export const Header: React.FC = () => {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [routs, setRouts] = useState<Routs[]>([
		{
			title: "خانه",
			href: "/",
			subRoute: null,
			isOpen: false,
		},
		{
			title: "مراجع و استانداردها",
			href: "/standards",
			subRoute: [
				{
					title: "مراجع و استانداردهای فارسی",
					href: "/standards/persian",
				},
				{
					title: "مراجع و استانداردهای انگلیسی",
					href: "/standards/english",
				},
				{
					title: "نرم افزارهای محاسبات استاندارد",
					href: "/standards/programs",
				},
			],
			isOpen: false,
		},
		{
			title: "آموزش",
			href: "/edu",
			subRoute: null,
			isOpen: false,
		},
		{
			title: "کاتالوگ",
			href: "/catalogue",
			subRoute: null,
			isOpen: false,
		},
		{
			title: "اخبار و مقالات",
			href: "/blog",
			subRoute: null,
			isOpen: false,
		},
		{
			title: "درباره ما",
			href: "/about",
			subRoute: null,
			isOpen: false,
		},
	]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY <= 80) {
				setScrolled(false);
			} else {
				setScrolled(true);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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

	useEffect(() => {
		setAccordionOpen(false);
	}, [open]);
	const [accordionOpen, setAccordionOpen] = useState(false);

	const handleMouseEnter = (item: Routs) => {
		if (!!item?.subRoute) {
			const updatedRouts = routs.map((route) => {
				if (route.href === item.href) {
					return { ...route, isOpen: true };
				}
				return route;
			});
			setRouts(updatedRouts);
		}
	};
	const handleMouseLeave = (item: Routs) => {
		if (!!item?.subRoute) {
			const updatedRouts = routs.map((route) => {
				if (route.href === item.href) {
					return { ...route, isOpen: false };
				}
				return route;
			});
			setRouts(updatedRouts);
		}
	};

	return (
		<>
			<div className="h-20 bg-primary hidden lg:block">
				<div className="container h-full">
					{/* <div className="flex items-center h-full">
						<div className="w-[40%]">
							<Image src="/images/logo.png" width={64} height={36} alt="لوگو"></Image>
						</div>
						<div className="flex items-center gap-2 w-[30%] justify-end">
							<IconPhone stroke="white" strokeWidth={1.8} height={36} width={36} />
							<div className="flex flex-col gap-1">
								<div className="text-secondary">تماس با ما</div>
								<div className="text-primary-content">4097 6661 021</div>
							</div>
						</div>
						<div className="flex items-center gap-2 w-[30%] justify-end">
							<IconMail stroke="white" strokeWidth={1.8} height={36} width={36} />
							<div className="flex flex-col gap-1">
								<div className="text-secondary">ایمیل</div>
								<div className="text-primary-content">Lotussanat@gmail.com</div>
							</div>
						</div>
						<div className="flex items-center gap-2 w-[30%] justify-end">
							<IconClock stroke="white" strokeWidth={1.8} height={36} width={36} />
							<div className="flex flex-col gap-1">
								<div className="text-secondary">ساعت کاری</div>
								<div className="text-primary-content">شنبه تا چهارشنبه 8 الی 18</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
			<header
				className={`hidden lg:flex w-full text-base-content items-center h-20 mx-auto duration-200 z-50 sticky top-0 bg-white shadow  ${
					scrolled ? "" : ""
				}`}
			>
				<div className="container">
					<div className="flex justify-between items-center">
						<span className="">
							<ul className="mr-4 flex flex-row items-center gap-8">
							<IconMoney stroke="black" strokeWidth={2} className="" />
								{routs.map((item) => (
									<li
										onMouseEnter={() => handleMouseEnter(item)}
										onMouseLeave={() => handleMouseLeave(item)}
										key={item.href}
										className="relative "
									>
										<Link
											className={` hover:text-secondary transition flex gap-1 items-center ${
												item.href !== "/" && pathname.includes(item.href)
													? "text-secondary"
													: item.href == "/" && pathname == item.href
													? "text-secondary"
													: "text-primary"
											}`}
											href={!item?.subRoute ? item?.href : "#"}
										>
											{item.title}
											{/* {!!item?.subRoute && <IconChevronDown width={12} strokeWidth={4} />} */}
										</Link>
										{!!item?.subRoute && !!item?.isOpen && <MegaMenu subRoute={item?.subRoute} />}
									</li>
								))}
							</ul>
						</span>
						<span className="mr-auto">auth</span>
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
					className={`md:flex items-center justify-between ${
						scrolled ? "bg-primary shadow-md" : ""
					} py-4 md:px-10 px-7 duration-200 flex items-center z-50 relative`}
				>
					<div onClick={() => setOpen(!open)} className="cursor-pointer">
						{/* <IconHamburger strokeWidth={0} fill="white" width={32} height={32} /> */}
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
							<div>
								<Image src="/images/logo.png" width={48} height={24} alt="لوگو"></Image>
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
							<div className="font-bold text-primary border-b border-primary/30 pb-2  px-6">صفحات اصلی سایت</div>
							<div className="flex flex-col gap-3 text-sm mt-3">
								{routs.map((item) => {
									if (item?.href == "/standards") {
										return (
											<div className="" key={item.href}>
												<button
													onClick={() => setAccordionOpen(!accordionOpen)}
													className={`flex justify-between w-full text-neutral-content text-sm `}
												>
													<span className="relative right-6">{item?.title}</span>

													<span className={`left-6 relative duration-100 ${accordionOpen ? "rotate-0" : "rotate-90"}`}>
														<IconBasket fill="white" strokeWidth={0} className="" />
														gggg
													</span>
												</button>
												<div
													className={`grid overflow-hidden transition-all duration-300 ease-in-out  text-sm ${
														accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
													}`}
												>
													<div
														className={`overflow-hidden flex flex-col gap-3 bg-neutral-content-focus px-8 duration-100 ${
															accordionOpen ? "py-3 mt-2" : "mt-0"
														}`}
													>
														<div className="relative ">
															<Link
																className={`  transition ${
																	pathname.includes("standards/persian") ? "text-primary" : "text-neutral-content"
																}`}
																href="/standards/persian"
															>
																مراجع و استاندارد فارسی
															</Link>
														</div>
														<div className="relative ">
															<Link
																className={`  transition ${
																	pathname.includes("standards/english") ? "text-primary" : "text-neutral-content"
																}`}
																href="/standards/english"
															>
																مراجع و استاندارد انگلیسی
															</Link>
														</div>
														<div className="relative ">
															<Link
																className={`  transition ${
																	pathname.includes("standards/programs") ? "text-primary" : "text-neutral-content"
																}`}
																href="/standards/programs"
															>
																نرم افزارهای محاسبات استاندارد
															</Link>
														</div>
													</div>
												</div>
											</div>
										);
									} else {
										return (
											<div key={item.href} className="relative  px-6">
												<Link
													className={`transition ${
														item.href !== "/" && pathname.includes(item.href)
															? "text-primary font-semibold"
															: item.href == "/" && pathname == item.href
															? "text-primary  font-semibold"
															: "text-neutral-content"
													}`}
													href={item.href !== "/standards" ? item?.href : "#"}
												>
													{item.title}
												</Link>
											</div>
										);
									}
								})}
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
