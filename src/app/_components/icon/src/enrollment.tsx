import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M3 15h4.382c.379 0 .725.214.894.553l.447.894c.17.339.516.553.895.553h4.764a.998.998 0 0 0 .894-.553l.447-.894c.17-.339.516-.553.895-.553H21"/><path d="M17 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M11.99 12V3"/><path d="M15.591 6.591 12 3 8.409 6.591"/>
    </BaseIcon>
    )
}