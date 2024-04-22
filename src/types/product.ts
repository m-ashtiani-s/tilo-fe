export type Product = {
    _id: string;
    title: string;
    numbersOfRate: number;
    rate: number;
    images: string[];
    featuredImage: string;
    price: number;
    priceWithDiscount: number;
    discount: number | null;
    discountExpire: Date | string | null;
    shortInfo: string;
    additionalInfo: string;
    measurement: string;
    colors: string | colorList;
    tags: string[] | null;
    category: string[];
    categoryNames: string[];
};


type colorList={
    color: string;
    images: string[] | null;
}