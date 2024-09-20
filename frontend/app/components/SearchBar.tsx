"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
    const router = useRouter();
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push('/');

        // Construct a new URL depending on the searchTerm    
        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true });

        router.push(url);
        reset();
    };

    return (
        <div className="relative">
            <div className="flex items-center lg:hidden">
                <AiOutlineSearch 
                    onClick={() => setIsSearchVisible(prev => !prev)} 
                    className="text-2xl cursor-pointer"
                />
            </div>
            <div className={`absolute top-10  mx-8 w-full ${isSearchVisible ? 'block' : 'hidden'} lg:static
             lg:flex lg:items-center`}>
                <div className="flex items-center border-gray-800 rounded-md justify-center lg:justify-start">
                    <input
                        {...register('searchTerm')}
                        className="p-2 border-gray-300 border-[0.5px] rounded-l-md focus:outline-none 
                        focus:border-[0.5px]
                        focus:border-slate-600 w-80"
                        placeholder="Search for products"
                        autoComplete="off"
                        type="text"
                    />
                    <button 
                        onClick={handleSubmit(onSubmit)} 
                        className="bg-red-700 hover:opacity-80 text-white p-2 rounded-r-md"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
