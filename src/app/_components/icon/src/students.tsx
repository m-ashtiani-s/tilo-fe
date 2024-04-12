import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M3 18a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4M16 4.651a2.5 2.5 0 1 1 0 5M11.405 4.996a3.401 3.401 0 1 1-4.81 4.81 3.401 3.401 0 0 1 4.81-4.81M17 13a4 4 0 0 1 4 4"/>
    </BaseIcon>
    )
}