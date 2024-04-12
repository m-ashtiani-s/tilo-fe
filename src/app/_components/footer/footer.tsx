"use client";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="">
			<div className="flex bg-primary py-6 ">
				<div className="container">
					<div className="flex justify-between flex-col lg:flex-row items-center gap-4">
						<div className="text-white text-sm lg:text-base text-center leading-8">برای خدمات مشاوره، طراحی و محاسبات پروژ خود، با ما در ارتباط باشید</div>
						<div className="text-white flex gap-4 items-center flex-row-reverse">
							۹۷ ۱۴۰ ۶۶۶ ۰۲۱ – ۳۵۰۷ ۳۳۵ ۰۹۱۲
						</div>
					</div>
				</div>
			</div>
			<div className="bg-primary-focus">
				<footer className="container flex flex-col  lg:flex-row items-center gap-5 px-0  lg:px-12 xl:px-40 py-20">
					<div className="text-center flex flex-col items-center lg:me-20">
						<Image src="/images/logo.png" width={150} height={36} alt="کلاسبن" />

						<p className="opacity-70 mt-2">
						ارائه دهنده خدمات مشاوره پروژه، طراحی، 
							<br /> نقشه کشی و محاسبات مهندسی
						</p>
					</div>
					<div className="flex flex-1 flex-col md:flex-row gap-5 md:gap-6 whitespace-nowrap">
						<div className="grid flex-1 basis-36 gap-3 place-items-center md:place-items-start ">
							<Link href="/docs/install/" className="link link-hover">
								برنامه LiftPart
							</Link>
							<Link href="/docs/customize/" className="link link-hover">
								برنامه LiftAxe
							</Link>
							<Link href="/docs/customize/" className="link link-hover">
								برنامه LiftForm
							</Link>
						</div>

						<div className="grid flex-1 basis-36 gap-3 place-items-center md:place-items-start">
							<Link href="/docs/themes/" className="link link-hover">
								آموزش ها
							</Link>
							<Link href="/docs/themes/" className="link link-hover">
								اخبار و مقالات
							</Link>
							<Link href="/docs/themes/" className="link link-hover">
								درباره ما
							</Link>
						</div>
						
					</div>
				</footer>
			</div>

			<div className="bg-primary text-left">
				<div className="container py-6 flex justify-between items-center flex-col lg:flex-row gap-4">
					<div className="flex gap-5 items-center ">
						<div className="flex flex-col">
							<span className="text-base-content/50 ">طراحی و اجرا: <Link href='https://ayliweb.ir' className=" font-bold tracking-wide text-base-content">گروه آیلی وب</Link></span>
							
						</div>
					</div>
					<span className="text-sm text-base-content/60 font-semibold">
						
						<p>تمامی حقوق محفوظ است Copyright © 2023</p>
					</span>
				</div>
			</div>
		</div>
	);
};
