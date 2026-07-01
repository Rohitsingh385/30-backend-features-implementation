import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
}

export default function Input({
    label,
    ...props
}: InputProps){
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium">
                {label}
            </label>
            <input {...props} className="w-full rounded-md px-3 py-2 outline:none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 border-gray-300" />
        </div>
    )   
}