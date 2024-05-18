"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const boxMotions = {
	initial: { opacity: 1 },
};
const boxMotions1 = {
	initial: { scale: 0 },
};

const transitionProps = {
	duration: 0.2,
	scale: {
		type: "spring",
		damping: 50,
		stiffness: 400,
	},
};

const hide = {
	opacity: 0,
	transitionEnd: {
		display: "none",
	},
};

const show = {
	opacity: 1,
};
const show1 = {
	scale: 1,
};

function LoadingProvider({ children }: { children: any }) {
	const [hiden, setHiden] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const handleLoad = () => {
			setLoading(false);

			setTimeout(() => {
				setHiden(true);
			}, 200);
		};

		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);

			return () => {
				window.removeEventListener("load", handleLoad);
			};
		}
	}, []);

	console.log(loading);

	return (
		<>
			{loading && (
				<motion.div
					variants={boxMotions}
					initial="initial"
					animate={hiden ? hide : show}
					transition={transitionProps}
					className="fixed w-full h-screen bg-black z-[100000000]"
				>
					<motion.div
						variants={boxMotions1}
						initial="initial"
						animate={show1}
						transition={transitionProps}
						className="h-full flex items-center justify-center flex-col text-2xl gap-2"
					>
						<img src="/images/loading.gif" alt="" className="w-24" />
						Loading...
					</motion.div>
				</motion.div>
			)}
			<div>{children}</div>
		</>
	);
}

export default LoadingProvider;
