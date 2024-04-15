import Image from "next/image";
import HeroSlider from "./_components/heroSlider/heroSlider";
import { IconArrowRight } from "./_components/icon/icons";
import Link from "next/link";
import { Footer } from "./_components/footer/footer";
import Header from "./_components/header/header";

export default async function Home() {
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
						<div className="w-7/12 text-7xl text-neutral-7">
							Simply Unique/
							<br />
							Simply Better.
						</div>
						<div className="w-5/12 text-neutral-4 font-light text-lg">
							<b className="font-medium text-xl">Tilo </b>is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
						</div>
					</div>
				</div>
			</section>
			<section className="py-16">
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
			</section>
			<section className="py-16">
				<div className="container relative">
					<div className="">
						<div className="flex justify-between items-center">
							<div className="text-2xl text-neutral-7 font-medium">New Arrivals</div>
							<Link href="./" className=" text-neutral-7 font-medium flex items-center gap-2">
								New Arrivals{" "}
								<IconArrowRight fill="#141718" strokeWidth={0} width={14} className="flex items-center" viewBox="0 0 14 9" />
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
