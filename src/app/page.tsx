"use client";
import Image from "next/image";
import HeroSlider from "./_components/heroSlider/heroSlider";
import { IconArrowRight } from "./_components/icon/icons";
import Link from "next/link";
import { Footer } from "./_components/footer/footer";
import Header from "./_components/header/header";
import ProductSlider from "./_components/productSlider/productSlider";
import { Variants, motion } from "framer-motion";

const boxMotions = {
	initial: { opacity: 0 },
};

const transitionProps = {
	duration: 0.2,
	scale: {
		type: "spring",
		damping: 50,
		stiffness: 400,
	},
};

const show = {
	opacity: 1,
	display: "block",
};

const fromLeft: Variants = {
	offscreen: {
		left: -200,
		opacity: 0,
	},
	onscreen: {
		left: 0,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};
const fromRight: Variants = {
	offscreen: {
		right: -200,
		opacity: 0,
	},
	onscreen: {
		right: 0,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};
const fromBtm: Variants = {
	offscreen: {
		scale:0.5,
		bottom: -10,
		opacity: 0,
	},
	onscreen: {
		scale:1,
		bottom: 0,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};

export default function Home() {
	return (
		<main className="">
			<Header />

			<section className="">
				<div className="relative z-10">
					<HeroSlider />
				</div>
			</section>
			<section className="py-16">
				<div className="container relative z-10">
					<div className="flex items-center">
						<motion.div
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ once: true, amount: 0.8 }}
							variants={fromLeft}
							className="w-7/12 text-7xl text-neutral-7 relative"
						>
							Simply Unique/
							<br />
							Simply Better.
						</motion.div>
						<motion.div
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ once: true, amount: 0.8 }}
							variants={fromRight}
							className="w-5/12 text-neutral-4 font-light text-lg relative"
						>
							<b className="font-medium text-xl">Tilo </b>is a gift & decorations store based in HCMC,
							Vietnam. Est since 2019.
						</motion.div>
					</div>
				</div>
			</section>
			<motion.section
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ once: true, amount: 0.8 }}
				variants={fromBtm}
				className="py-16 relative"
			>
				<div className="container relative">
					<div className="flex gap-6 justify-center">
						<div className="w-6/12 flex justify-end">
							<Image width={548} height={664} src="/images/banner1.jpg" alt="banner" />
						</div>
						<div className="w-6/12 flex flex-col justify-between gap-6">
							<Image width={548} height={319} src="/images/banner2.jpg" alt="banner" />
							<Image width={548} height={319} src="/images/banner3.jpg" alt="banner" />
						</div>
					</div>
				</div>
			</motion.section>
			<section className="pt-16">
				<div className="container relative">
					<div className="">
						<div className="flex justify-between items-center">
							<div className="text-2xl text-neutral-7 font-medium">New Arrivals</div>
							<Link href="./" className=" text-neutral-7 font-medium flex items-center gap-2">
								New Arrivals{" "}
								<IconArrowRight
									fill="#141718"
									strokeWidth={0}
									width={14}
									className="flex items-center"
									viewBox="0 0 14 9"
								/>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="py-16">
				<div className="container relative">
					<ProductSlider />
				</div>
			</section>
			<Footer />
		</main>
	);
}
