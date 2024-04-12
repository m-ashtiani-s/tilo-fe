import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path clip-rule="evenodd" d="M12.692 6.917a1 1 0 0 1-1.384 0l-.693-.664A4.5 4.5 0 0 0 3 9.5c0 2.383 1.29 4.35 3.152 5.967 1.863 1.617 4.091 2.69 5.423 3.238.278.115.572.115.85 0 1.332-.548 3.56-1.62 5.423-3.238C19.71 13.85 21 11.883 21 9.5a4.5 4.5 0 0 0-7.615-3.247l-.693.664ZM12 4.81A6.5 6.5 0 0 0 1 9.5c0 6.368 6.97 9.885 9.814 11.055a3.096 3.096 0 0 0 2.372 0C16.03 19.385 23 15.868 23 9.5a6.5 6.5 0 0 0-11-4.69Z"/>
    </BaseIcon>
    )
}