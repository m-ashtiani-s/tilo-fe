import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M18.364 5.636A9 9 0 1 1 5.636 18.364 9 9 0 0 1 18.364 5.636"/><path d="M12.625 15.125H8.25c-.69 0-1.25-.56-1.25-1.25v-3.75c0-.69.56-1.25 1.25-1.25h4.375c.69 0 1.25.56 1.25 1.25v3.75c0 .69-.56 1.25-1.25 1.25ZM13.875 12.61l2.108 1.697A.625.625 0 0 0 17 13.82v-3.64a.625.625 0 0 0-1.017-.487l-2.108 1.697"/>
    </BaseIcon>
    )
}