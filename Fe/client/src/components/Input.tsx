import React from 'react'
import search from "../assets/icons/Search.png";

export default function Input(
    {placeholder, children, classes, typeInput, name = 'text'}
        : { placeholder: string, children?: React.ReactNode, classes?: string, typeInput?: string, name?: string }) {
    return (
        <div
            className={`w-full h-[44px] border-[1px] border-solid border-Neutral-B100 rounded-[6px] box-border ${classes}`}>
            {children}
            <input
                type={typeInput}
                className="pl-[15px] py-[9px] w-full"
                placeholder={placeholder}
                name={name}
                // required
            />
        </div>
    )
}
