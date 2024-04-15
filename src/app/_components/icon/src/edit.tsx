'use client'

import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M3 21h18M13.784 5.312s0 1.634 1.635 3.269c1.635 1.635 3.27 1.635 3.27 1.635m-11.37 7.772 3.433-.49c.495-.071.954-.3 1.308-.654l8.263-8.263a2.312 2.312 0 0 0 0-3.27l-1.635-1.634a2.312 2.312 0 0 0-3.269 0L7.156 11.94a2.311 2.311 0 0 0-.654 1.308l-.49 3.432a1.156 1.156 0 0 0 1.308 1.308Z"/>
    </BaseIcon>
    )
}