'use client'

import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5Z" stroke-miterlimit="10"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 7h-3M8 17H5" stroke-miterlimit="10"/>
    </BaseIcon>
    )
}