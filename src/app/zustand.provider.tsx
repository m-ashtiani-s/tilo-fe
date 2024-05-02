'use client';

import { API_URL } from "@/configs/global";
import { readData } from "@/core/http-service/http-service";
import { useCartStore } from "@/stores/cart.store";
import { useNotificationStore } from "@/stores/notification.store";
import { useSessionStore } from "@/stores/session";
import { Cart } from "@/types/cart";
import { Res } from "@/types/responseType";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


function ZustandProvider({children}: {children:any}) {
    const showNotification = useNotificationStore((state) => state.showNotification);
    const { data: session } = useSession();
   
    useEffect(()=>{
        getCart()
    },[])
    useEffect(()=>{
        useSessionStore.setState({session})
    },[session])

    const getCart = async () => {
        try {
            const res = await readData<Res<Cart>>(`${API_URL}/v1/cart`);

            !!res.success && useCartStore.setState({ cart:res?.data });
        } catch (error:any) {
            error?.code !==401 && showNotification({
				message: error?.message || 'get cart items failed',
				type: "error",
			});
        } finally {
        }
    };
    
    return (
        <>
        {children}
        </>
    )
}

export default ZustandProvider;