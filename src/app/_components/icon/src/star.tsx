import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="m12 2.896 2.935 5.993 6.565.967-4.75 4.662 1.121 6.586L12 17.993l-5.871 3.111 1.121-6.586L2.5 9.856l6.564-.967L12 2.896Z"/>
    </BaseIcon>
    )
}