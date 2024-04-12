import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M13.6 7.7c.9.8.9 2.3 0 3.1-.9.9-2.3.9-3.2 0-.9-.8-.9-2.3 0-3.1.9-.9 2.3-.9 3.2 0M16.3 16.5c-.2-1.3-1.4-2.4-2.8-2.4h-3c-1.4 0-2.6 1.1-2.8 2.4"/><path d="M17 21H7c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4Z"/>
    </BaseIcon>
    )
}