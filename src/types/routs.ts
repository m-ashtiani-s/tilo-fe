export interface Routs {
	title: string;
	href: string;
	subRoute: subRoute[] | null;
    isOpen:boolean
}

type subRoute = {
	title: string;
	href: string;
};
