import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M15.493 18.25A1.74 1.74 0 0 0 13.75 20a1.75 1.75 0 1 0 1.743-1.75M19 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2ZM3 20h10.75M17.25 20H21"/>
    </BaseIcon>
    )
}