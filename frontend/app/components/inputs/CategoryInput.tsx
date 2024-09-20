"use client"
import { IconType } from "react-icons";

interface CategoryInputProps{
    selected?: boolean,
    label: string,
    icon: IconType,
    onClick: (value: string) => void

}

const CategoryInput:React.FC<CategoryInputProps> = ({
    selected,
    label,
    icon:Icon,
    onClick
}) => {
    return ( 
        <div onClick={() => onClick(label)} className={`rounded-xl border-2 flex-col items-center gap-2 
        transition cursor-pointer flex hover:border-slate-500
        ${selected ? 'border-slate-800' : 'border-slate-200'}
        
        `}>
            <Icon size={30}/>
            <div className="font-medium">{label}</div>
        </div>
     );
}
 
export default CategoryInput;