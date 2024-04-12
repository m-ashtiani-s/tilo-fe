import { Size } from "@/types/component-base.type";
import classNames from 'classnames'
import { AvatarProps } from "./avatar.types";
import Image from "next/image";
import { IconUserProfile } from "../icon/icons";

const sizeClasses:Record<Size,number>={
    tiny: 30,
    small: 50,
    normal: 70,
    large: 120
}

export const Avatar : React.FC<AvatarProps> = ({
    variant="primary",
    size="normal",
    className,
    alt="",
    src,
    ...rest
})=>{
    const classes=classNames(
        'avatar',
        className,
        {[`avatar-${variant}`]:variant},
        {[`${sizeClasses[size]}`]:size},
        
    )
    return(
        <div
      style={{ width: sizeClasses[size], height: sizeClasses[size] }}
      className={classes}
    >
      {src ? (
        <Image
          src={src}
          width={sizeClasses[size]}
          height={sizeClasses[size]}
          alt={alt}
        />
      ) : (
        <IconUserProfile
          width={sizeClasses[size] / 2}
          height={sizeClasses[size] / 2}
        />
      )}
    </div>
    )
}