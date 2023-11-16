'use client'
import { useState } from "react"
import { FormInput } from "./FormInput"
import { Toaster, toast } from "sonner"

type LoginProps = {
    loginAsAdmin: () => Promise<void>,
    sendLogin: (email: string, password: string) => Promise<{ error: string; success?: undefined } | { success: any; error?: undefined }>
}

const LoginForm = ({loginAsAdmin, sendLogin}: LoginProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(!email || !password){
            return toast.error('Please enter a valid email and password')
        }

        await sendLogin(email, password)
    }


    const onClickAdmin = async () => {
        await loginAsAdmin()
    }

    return (
        <form onSubmit={onSubmit} className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl'>
            <Toaster />
            <div className='p-8'>
                <div className='border-b border-gray-900/10 pb-6'>
                    <FormInput
                        name='email'
                        labelText='Email'
                        type='email'
                        value={email}
                        placeholder='jsmith'
                        required
                        className='mb-6'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput
                        name='password'
                        labelText='Password'
                        type='password'
                        value={password}
                        placeholder='*******'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mt-6 w-full flex justify-end gap-3'>
                    <button onClick={onClickAdmin} type='button' className='rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'>
                        Login As Admin (Demo)
                    </button>
                    <button type='submit' className='rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'>
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm 