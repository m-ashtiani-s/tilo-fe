import { LoadingBehavior } from "@/types/loading-behavior.type";
import {ButtonHTMLAttributes} from "react"

export type ButtonProps=ButtonHTMLAttributes<HTMLButtonElement> & LoadingBehavior & {
    isOutline?:boolean;
    isLink?:boolean;
    animatedIcon?:boolean;
    shape?:ButtonShape;
    isDisabled?:boolean

}

export type ButtonShape = "default" | "rounded";