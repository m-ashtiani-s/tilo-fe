import { Cart } from "@/types/cart";
import { Notification } from "@/types/notification.interface";
import { generateID } from "@/utils/string";
import { create } from "zustand";
import {devtools} from 'zustand/middleware';

type CartState = {
    cart: Cart | null;
    loading: boolean;
    showCart: (cartItem: Cart) => void;
    setLoading: (loading: boolean) => void;
};

export const useCartStore = create<CartState>()(
    devtools((set) => ({
        cart: null,
        loading: true,
        showCart: (cartItem: Cart) => {
            set({ cart: cartItem });
        },
        setLoading: (loading: boolean) => {
            set({ loading });
        }
    }))
);

