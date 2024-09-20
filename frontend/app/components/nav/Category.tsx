"use client"

import { IconType } from "react-icons";


interface CategoryProps{
    label: string;
    icon:IconType;
    selected?: boolean

}

const Category:React.FC<CategoryProps> = ({label, icon:Icon, selected}) => {

    return ( 
        <div  className={`flex items-center justify-center gap-1 border-b-2 text-center transition 
        cursor-pointer hover:text-slate-800 p-3
        ${selected ? 'border-b-slate-900 text-slate-900' : 'border-transparent text-slate-500'}`}>
            <Icon size={20}/>
            <div className="font-medium text-sm">{label}</div>
        </div>
     );
}
 
export default Category;