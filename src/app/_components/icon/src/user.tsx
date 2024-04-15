'use client'

import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M17.559 18.549a7.003 7.003 0 0 0-13.118 0m13.118 0A9.976 9.976 0 0 0 21 11c0-5.523-4.477-10-10-10S1 5.477 1 11a9.977 9.977 0 0 0 3.441 7.549m13.118 0A9.961 9.961 0 0 1 11 21a9.961 9.961 0 0 1-6.559-2.451M14 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </BaseIcon>
    )
}