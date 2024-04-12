import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="m2.996 18.01 1.226 1.104 2.47-2.222M2.996 12.007l1.226 1.104L6.69 10.89M11 18.503h10.004M11 12.5h10.004M2.996 6.005l1.226 1.104L6.69 4.887M11 6.498h10.004"/>
    </BaseIcon>
    )
}