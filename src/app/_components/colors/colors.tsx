import { tailwindColors } from "../../../../tailwind.config"
import { colord, extend } from "colord";


export const Colors:React.FC =()=>{
    return(
        <div className="flex flex-wrap items-center h-full py-6 justify-center" lang="en">
            {
                Object.entries(tailwindColors).map(([name,color])=>
                   (
                    <div key={color} className={`flex flex-col gap-2 w-64 h-64 items-center justify-center`} style={{background:color}}>
                        <span className={colord(color).isDark() ? "text-primary-content" : "text-black"}>{name}</span>
                        <span className={colord(color).isDark() ? "text-primary-content" : "text-black"}>{color}</span>
                    </div>
                   )

                )
            }
        </div>
    )

}