"use client";

import { API_URL } from "@/configs/global";
import { readData } from "@/core/http-service/http-service";
import { useCartStore } from "@/stores/cart.store";
import { useNotificationStore } from "@/stores/notification.store";
import { useSessionStore } from "@/stores/session";
import { Cart } from "@/types/cart";
import { Res } from "@/types/responseType";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

function ZustandProvider({ children }: { children: any }) {
    const showNotification = useNotificationStore((state) => state.showNotification);
    const { data: session } = useSession();
    const sessionRead = useRef(false);
    const setLoading = useCartStore((state) => state.setLoading);
    const loading = useCartStore((state) => state.loading);

    useEffect(() => {
        !!sessionRead.current && getCart();
    }, [sessionRead.current]);
    useEffect(() => {
        useSessionStore.setState({ session });
        if (!!session) {
            sessionRead.current = true;
        }
    }, [session]);

    const getCart = async () => {
        try {
            setLoading(true);
            const res = await readData<Res<Cart>>(`${API_URL}/v1/cart`);

            if (res.success) {
                useCartStore.setState({ cart: res?.data });
            }
        } catch (error: any) {
            if (error?.code !== 401) {
                showNotification({
                    message: error?.message || "get cart items failed",
                    type: "error",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return <>{children}</>;
}

export default ZustandProvider;
