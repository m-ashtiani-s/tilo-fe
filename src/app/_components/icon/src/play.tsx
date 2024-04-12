import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm2.5 14a1 1 0 0 1-2 0v-2.72l-4.375 3.501A1 1 0 0 1 6.5 16V8a1 1 0 0 1 1.625-.781l4.375 3.5V8a1 1 0 0 1 2 0Zm3 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0Z"/>
    </BaseIcon>
    )
}