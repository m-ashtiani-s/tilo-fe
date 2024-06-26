import "./globals.css";
import { Poppins } from "next/font/google";
import { Header } from "./_components/header/header";
import { Footer } from "./_components/footer/footer";
import QueryProvider from "@/providers/react-query-providers";
import NextTopLoader from "nextjs-toploader";
import { Notifications } from "./_components/notification/notification";
import { SessionProvider } from "next-auth/react";
import ZustandProvider from "./zustand.provider";
import { API_URL } from "@/configs/global";
import LoadingProvider from "./loadingProvider";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
	return (
		<html dir="ltr" className={`${poppins.variable} `}>
			<body className="flex flex-col content-center bg-base-100 text-base-content min-h-screen font-poppins text-base font-normal">
				<SessionProvider>
					<ZustandProvider>
						<NextTopLoader
							color="#e15a00"
							initialPosition={0.08}
							crawlSpeed={200}
							height={4}
							crawl={true}
							showSpinner={false}
							easing="ease"
							speed={200}
							shadow="0 0 10px #2299DD,0 0 5px #2299DD"
							zIndex={1600}
							showAtBottom={false}
						/>
						<Notifications />
						<QueryProvider>
							<LoadingProvider>

							<div className="text- text-neutral-6">{children}</div>
							</LoadingProvider>
						</QueryProvider>
					</ZustandProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
