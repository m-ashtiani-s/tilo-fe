import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M22.004 2.996H1.996M12 13V7.498M7.998 13v-1.833M16.002 13V9.332M21.004 2.996v11.887c0 1.17-1.008 2.119-2.251 2.119H5.247c-1.243 0-2.25-.948-2.25-2.119V2.996M13 17.002l2.001 4.002M11 17.002l-2.001 4.002"/>
    </BaseIcon>
    )
}