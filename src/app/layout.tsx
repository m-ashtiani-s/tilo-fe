import "./globals.css";
import { Poppins } from "next/font/google";
import { Header } from "./_components/header/header";
import { Footer } from "./_components/footer/footer";
import QueryProvider from "@/providers/react-query-providers";
import NextTopLoader from "nextjs-toploader";
import { Notifications } from "./_components/notification/notification";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
    display: "swap",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html dir="ltr" className={`${poppins.variable} `}>
            <body className="flex flex-col content-center bg-base-100 text-base-content min-h-screen font-poppins text-base font-normal">
                <SessionProvider>
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
                        <div className="">{children}</div>
                    </QueryProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
