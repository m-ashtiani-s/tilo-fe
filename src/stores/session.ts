import { Notification } from "@/types/notification.interface";
import { Session } from "@/types/session";
import { generateID } from "@/utils/string";
import { create } from "zustand";
import {devtools} from 'zustand/middleware';

type SessionState = {
    session: Session | null;
    addSession: (product: Session | null) => void;
};

export const useSessionStore = create<SessionState>()(devtools((set, get) => ({
    session: null,
    addSession: (product) => {
        set(state => ({
            session: product
        }));
    }
})));

