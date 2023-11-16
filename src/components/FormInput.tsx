import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string
  className?: string
  error?: boolean
}

export const FormInput = ({ labelText, error, className, ...props }: Props) => {
    return (
        <div className={className}>
            <label className={`block text-sm font-medium leading-6 text-gray-900`}>
                {labelText}
            </label>
            <input
                className={`pl-3 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 
                    ${error && 'border-2 border-red-500 animate-shake'}`}
                {...props}
            ></input>
        </div>
    )
}