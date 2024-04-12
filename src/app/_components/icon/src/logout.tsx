import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M17.657 6.343a8 8 0 1 1-11.314 0M12 4v8"/>
    </BaseIcon>
    )
}