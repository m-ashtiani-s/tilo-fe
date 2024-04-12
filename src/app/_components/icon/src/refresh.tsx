import { BaseIcon } from "@/app/_components/icon/base-icon"
import { svgIcon } from "@/app/_components/icon/icon.types"

export default function IconTheme(props:svgIcon) {
    return(
        <BaseIcon {...props}>
      <path d="M19.911 9.962c-.889-3.517-4.066-6.124-7.859-6.124-1.014 0-1.98.194-2.874.534M6.398 6.143c-2.601 2.53-3.271 6.583-1.374 9.868a8.081 8.081 0 0 0 1.899 2.222"/><path d="M10.953 5.689 8.755 4.058l2.198-1.996M7.176 16.038l-.313 2.72-2.828-.906M18.028 14.134l2.511-1.088.63 2.902"/><path d="M9.848 19.756c3.491.99 7.336-.459 9.233-3.744a8.065 8.065 0 0 0 .975-2.756"/>
    </BaseIcon>
    )
}