import { Button } from "@/app/_components/button/button";

export default async function Home() {
	return (
		<main className="">
			<section className="bg-black bg-edu-img h-140 after-dark-need relative z-40 bg-cover bg-left  bg-no-repeat">
				<div className="container h-full relative z-10 p-4">
					<div className="h-full flex flex-col justify-center items-center gap-6">
						<h1 className="text-3xl sm:text-5xl font-semibold text-neutral">آموزش های لوتوس</h1>
						<p className="text-neutral text-sm sm:text-lg text-center leading-8">ارائه دهنده خدمات مشاوره پروژه، طراحی، نقشه کشی و محاسبات مهندسی</p>
						
					</div>
				</div>
			</section>
		</main>

	);
}
