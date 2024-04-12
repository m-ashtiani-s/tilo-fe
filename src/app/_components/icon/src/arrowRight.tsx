import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path clip-rule="evenodd" d="M9.09.765a1 1 0 0 1 1.414.057l3.23 3.5a1 1 0 0 1 0 1.356l-3.23 3.5a1 1 0 1 1-1.47-1.356L10.716 6H1a1 1 0 0 1 0-2h9.716L9.034 2.178A1 1 0 0 1 9.091.765Z"/>
    </BaseIcon>
    )
}