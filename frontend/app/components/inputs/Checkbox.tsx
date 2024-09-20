"use client"

import { UseFormRegister, FieldValues } from "react-hook-form";

interface CheckboxProps{
    id: string,
    label: string,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>
}

const Checkbox:React.FC<CheckboxProps> = ({
    id,
    label,
    disabled,
    register
}) => {
    return (
        <div className="w-full items-center flex flex-row gap-2">
            <input type="checkbox"
            id={id}
            disabled={disabled}
            {...register(id)}
            placeholder=""
            className="cursor-pointer"/>
            <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
            </div>
    )
}

export default  Checkbox;