import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </BaseIcon>
    )
}