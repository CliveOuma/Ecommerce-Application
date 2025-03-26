"use client";

import React from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    type?: "button" | "submit" | "reset";
    custom?: string;
    icon?: IconType;
    small?: boolean;
    isLoading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    custom = "", 
    icon: Icon,
    small,
    isLoading,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
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
                ${small ? "text-sm font-light py-1 px-2 border-[1px]" : "text-md font-semibold py-3 px-4 border-2"}
                ${custom} Custom styles will now override default styles
                ${!custom && outline ? "bg-white text-gray-800 border-gray-300" : ""}
                ${!custom && !outline ? "bg-gray-700 text-white" : ""}
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
};

export default Button;
