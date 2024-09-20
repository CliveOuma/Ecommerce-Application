import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';

interface ActionBtnProps {
    icon: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    withLoading?: boolean; // Prop to conditionally show loading spinner
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, withLoading = false }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (withLoading) {
            setLoading(true);
        }
        try {
            await onClick(e, setLoading);
        } finally {
            if (withLoading) {
                setLoading(false);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center w-[40px] cursor-pointer border rounded h-[30px] text-slate-700 border-slate-400"
            disabled={loading && withLoading}
        >
            {loading && withLoading ? <FaSpinner size={18} className="animate-spin" /> : <Icon size={18} />}
        </button>
    );
};

export default ActionBtn;
