'use client'

import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M17.5 17.5 21 21m-1-10.5a9.5 9.5 0 1 0-19 0 9.5 9.5 0 0 0 19 0Z"/>
    </BaseIcon>
    )
}