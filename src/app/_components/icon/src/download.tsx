import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="m15 10-3 3-3-3M12 3v10M8 16h8"/><path d="M18.364 5.636a9 9 0 0 1 0 12.728 9 9 0 0 1-12.728 0 9 9 0 0 1 0-12.728"/>
    </BaseIcon>
    )
}