import { ComponentBase, Variant } from "@/types/component-base.type";
import { ReactNode } from "react";

export type TimerRef = {
    start: () => void;
    pause: () => void;
    restart: (expiryTimestamp: Date) => void;
    resume: () => void;
}

type VariantWithGradient =  Omit<ComponentBase, 'variant' | 'isDisabled'>;

export type TimerProps = VariantWithGradient & {
    variant?: Variant | 'gradient',
    expiryTimestamp: Date,
    autoStart?: boolean,
    showTitle?: boolean,
    showDays?: boolean,
    showHours?:boolean,
    showSec?:boolean,
    onExpire?: () => void;
}

export type TimerProgressProps = VariantWithGradient & {
    variant?: Variant | 'gradient',
    value: number;
    maxValue: number;
    showTitle?: boolean;
    datePart: string;
    children: ReactNode;
}