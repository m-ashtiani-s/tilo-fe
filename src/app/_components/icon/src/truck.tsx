'use client'

import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M14 19V7m0 12h2m-2 0H9m5-12a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a4.002 4.002 0 0 0 3.004 3.875M14 7h3.21a2 2 0 0 1 1.367.54l2.79 2.617a2 2 0 0 1 .633 1.46V17a2 2 0 0 1-2 2m0 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-7 0a2 2 0 1 1-3.996-.125M9 19a2 2 0 0 0-3.996-.125"/><path d="M10 8H8M10 12H6"/>
    </BaseIcon>
    )
}