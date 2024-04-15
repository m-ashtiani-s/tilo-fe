import { Footer } from "../_components/footer/footer";
import Header from "../_components/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />

			<div className="">{children}</div>

			<Footer />
		</>
	);
}
