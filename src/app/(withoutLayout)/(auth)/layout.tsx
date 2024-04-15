export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen">
			<div className="w-5/12 bg-[url('/images/authbg.jpg')] bg-cover bg-center"></div>
			<div className="w-7/12 flex items-center justify-center px-28">{children}</div>
		</div>
	);
}
