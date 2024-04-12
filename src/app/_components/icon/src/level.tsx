import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M3 3v18M3 14.333h12V18a1 1 0 0 1-1 1H3v-4.667Z"/><path d="M3 9.667h17a1 1 0 0 1 1 1v2.667a1 1 0 0 1-1 1H3V9.667ZM3 5h14a1 1 0 0 1 1 1v3.667H3V5Z"/>
    </BaseIcon>
    )
}