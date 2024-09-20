"use client"

import React from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
    label: string,
    disabled?: boolean,
    outline?: boolean,
    type?: "button" | "submit" | "reset";
    custom?: string,
    icon?: IconType,
    small?: boolean,
    isLoading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    custom,
    type = "button",
    icon: Icon,
    small,
    isLoading,
    onClick,
}) => {
    return (
        <button onClick={onClick}  disabled={disabled || isLoading}
            className={`
                disabled:opacity-70
                rounded-md
                hover:opacity-90
                transition
                w-full
                border
                flex
                justify-center
                items-center
                gap-2
                ${outline ? 'bg-white' : 'bg-red-700'}
                ${outline ? 'text-gray-800' : 'text-white'}
                ${small ? 'text-sm font-light' : 'text-md font-semibold'}
                ${small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-2'}
                ${custom ? custom : ''}
            `}
        >
        {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin" size={24} />
    ) : (
        <>
            {Icon && <Icon size={24} />}
            {label}
        </>
        )}
        </button>
    );
}

export default Button;
