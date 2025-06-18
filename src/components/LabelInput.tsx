
import React from 'react';

interface LabeledInputType{
    label: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    type?: string;
}

export const LabeledInput = ({label, placeholder,onChange, type}: LabeledInputType)=>{
    return (
        <div>
            <label  className="block mt-2 mb-4 text-sm font-semibold text-black">{label}</label>
            <input  onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}

