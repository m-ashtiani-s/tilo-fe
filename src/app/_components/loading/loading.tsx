import { Size } from "@/types/component-base.type";
import { LoadingProps } from "./loading.types";
import classNames from 'classnames'

const sizeClasses:Record<Size,string>={
    tiny: 'loading-xs',
    small: 'loading-sm',
    normal: '',
    large: 'loading-lg'
}

export const Loading : React.FC<LoadingProps> = ({
    variant,
    size="normal",
    type="spinner",
    className,
    ...rest
})=>{
    const classes=classNames(
        'loading',
        className,
        {[`loading-${variant}`]:variant},
        {[`loading-${type}`]:type},
        {[`${sizeClasses[size]}`]:size},
        
    )
    return(
        <span className={classes}></span>
    )
}