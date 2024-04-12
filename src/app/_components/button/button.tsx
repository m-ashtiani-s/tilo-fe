import { Size } from "@/types/component-base.type";
import { ButtonProps, ButtonShape } from "./button.types";
import classNames from 'classnames'
import { Loading } from "../loading/loading";


const shapeClasses:Record<ButtonShape,string>={
    default:'',
    rounded:'btn-rounded'
}

export const Button : React.FC<ButtonProps> = ({
    isDisabled=false,
    isOutline=false,
    shape="default",
    isLoading=false,
    loadingType="spinner",
    loadingText="در حال انجام ...",
    type="button",
    isLink=false,
    animatedIcon=false,
    children,
    className,
    ...rest
})=>{
    const classes=classNames(
        'btn duration-150',
        className,
        {"btn-outline":isOutline},
        {"pointer-events-none opacity-60":isLoading},
        {"btn-link":isLink}, 
        {"animated-icon":animatedIcon},
        {[`${shapeClasses[shape]}`]:shape},
        
    )
    return(
        <button type={type} disabled={isDisabled} {...rest} className={classes}>
            {!!isLoading && <Loading type={loadingType} />}
            {!!isLoading ? loadingText : children}
        </button>
    )
}