"use client";

import Image from "next/image";
import Link from "next/link";
import { IconFacebook, IconInstagrm, IconYoutube } from "../icon/icons";

export const Footer = () => {
	return (
		<div className="">
			<div className="bg-neutral-7">
				<footer className="container flex flex-col gap-12 pt-20 pb-14">
					<div className="flex justify-between items-center">
						<div className="flex gap-8 items-center">
							<div className="font-semibold text-2xl text-white">Tilo</div>
							<div className="w-0.25 h-6 bg-neutral-4"></div>
							<div className="text-neutral-3">Gift & Decoration Store</div>
						</div>
						<div className="flex gap-10 items-center text-neutral-1">
							<Link className="hover:text-secondary-green duration-200 " href="./">
								Home
							</Link>
							<Link className="hover:text-secondary-green duration-200 " href="./">
								Shop
							</Link>
							<Link className="hover:text-secondary-green duration-200 " href="./">
								Product
							</Link>
							<Link className="hover:text-secondary-green duration-200 " href="./">
								Blog
							</Link>
							<Link className="hover:text-secondary-green duration-200 " href="./">
								Contact Us
							</Link>
						</div>
					</div>
					<div className="border-t border-neutral-4 pt-4 flex justify-between items-center">
						<div className="flex gap-7 items-center">
							<div className="text-neutral-3 font-light">Copyright © 2023 3legant. All rights reserved</div>
							<Link className="hover:text-secondary-green duration-200 text-neutral-1" href="./">Privacy Policy</Link>
							<Link className="hover:text-secondary-green duration-200 text-neutral-1" href="./">
								Terms of Use
							</Link>
						</div>
						<div className="flex gap-10 items-center">
							<Link className="hover:text-secondary-green duration-200 " href="./">
								<IconInstagrm className="hover:fill-secondary-green duration-200" fill="#FEFEFE" strokeWidth={0} width={32} height={32} />
							</Link>
							<Link className="hover:text-secondary-green duration-200 " href="./">
								<IconFacebook className="hover:stroke-secondary-green duration-200" stroke="#FEFEFE" strokeWidth={1.3} width={32} height={32} />
							</Link>
							<Link className="hover:text-secondary-green duration-200 " href="./">
								<IconYoutube className="hover:fill-secondary-green duration-200" fill="#FEFEFE" strokeWidth={0} width={32} height={32} />
							</Link>
							
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};
