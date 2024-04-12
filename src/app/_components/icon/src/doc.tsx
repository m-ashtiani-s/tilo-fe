import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="m8 4 1.3-1.625A1 1 0 0 1 10.081 2h3.839a1 1 0 0 1 .781.375L16 4v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4Z"/><path d="M8 4H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 11h8M8 16h8"/>
    </BaseIcon>
    )
}