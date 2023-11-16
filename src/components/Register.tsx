'use client'
import { createBrowserClient } from '@supabase/ssr'
import React, { useState } from 'react'
import { FormInput } from './FormInput'
import { Toaster, toast } from 'sonner'

type Props = {
    className?: string,
    createStaff: (email: string, password: string, username: string) => Promise<{ error: string; success?: undefined; } | { success: string; error?: undefined; }>
}

const Register = ({className, createStaff}: Props) => {      
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const res = await createStaff(email, password, username)

        if(res.error){
            setIsLoading(false)
            return toast.error(res.error)
        }
        

        setEmail('')
        setPassword('')
        setUsername('')
        setIsLoading(false)

        return toast.success(res.success)
    }

    return (
            <form onSubmit={onSubmit} className={className}>
                <Toaster />
                <div className='p-8'>
                    <div className='border-b border-gray-900/10 pb-6'>
                        <FormInput
                            name='email'
                            labelText='Staff Email'
                            type='email'
                            placeholder='jsmith'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mb-6'
                        />
                        <FormInput
                            name='username'
                            labelText='Staff Username'
                            placeholder='jsmith'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='mb-6'
                        />
                        <FormInput
                            name='password'
                            labelText='Staff Password'
                            type='password'
                            placeholder='*******'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mt-6 w-full flex justify-end gap-3'>
                        <button disabled={isLoading} type='submit' className='rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
    )
}

export default Register
