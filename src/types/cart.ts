export type Cart = {
	_id: string;
	products: productInCart[];
	cartSum: number;
	cartSumWithDiscount: number;
	createdAt: string;
	updatedAt: string;
};

export type productInCart = {
	_id: string;
	title: string;
	featuredImage: string;
	price: number;
	priceWithDiscount: number;
	discount: number | null;
	quantity: number;
};
