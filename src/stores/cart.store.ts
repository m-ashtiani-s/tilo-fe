import { Cart } from "@/types/cart";
import { Notification } from "@/types/notification.interface";
import { generateID } from "@/utils/string";
import { create } from "zustand";
import {devtools} from 'zustand/middleware';

type CartState = {
    cart: Cart | null;
    showCart: (cartItem: Cart) => void;
};

export const useCartStore = create<CartState>()(devtools((set, get) => ({
    cart: null,
    showCart: (cartItem:Cart) => {
        set(state => ({
            cart: cartItem
        }));

        
    }
})));

