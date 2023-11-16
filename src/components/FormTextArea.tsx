import React from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string
  className?: string
  rows?: number
  defaultValue?: string
  error?: boolean
}

export const FormTextArea = ({ labelText, error, className, rows, ...props }: Props) => {
    return (
        <div className={className}>
            <label className={`block text-sm font-medium leading-6 text-gray-900`}>
                {labelText}
            </label>
            <div className='mt-2'>
                <textarea
                    rows={rows}
                    className={`pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                        {error && 'border-2 border-red-500 animate-shake'}`}
                    {...props}
                />
            </div>
        </div>
    )
}