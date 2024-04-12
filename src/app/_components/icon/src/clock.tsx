import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M12 21c4.95 0 9-4.05 9-9s-4.05-9-9-9M12 21c-2.931 0-5.538-1.426-7.184-3.612"/><path d="M4.816 17.388A8.931 8.931 0 0 1 3 12c0-4.95 4.05-9 9-9M7.359 15.639l4.922-2.936V6.375"/>
    </BaseIcon>
    )
}