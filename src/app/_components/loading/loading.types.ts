import { ComponentBase } from "@/types/component-base.type"
import { LoadingBehavior } from "@/types/loading-behavior.type";
import {ButtonHTMLAttributes} from "react"

export type LoadingProps=Omit<ComponentBase , 'isDisabled'> & {
    type?: "spinner" | "ring"
}
