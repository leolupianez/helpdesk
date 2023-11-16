import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/lib/supabase.server'
import { Metadata } from 'next'
import LoginForm from '@/components/LoginForm'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Staff Login - Help Desk',
}

const LoginPage = () => {    
    const sendLogin = async (email: string, password: string) => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return {error: error.message}
        }

        return {success: data.user.user_metadata.username}
    }

    const adminLogin = async () => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'admin@example.com',
            password: 'qwerty',
        })

        if (error) {
            console.log(error)
        }

        redirect('/admin')

    }
    
    return (
        <div className='mx-auto max-w-2xl'>
            <h1 className='text-3xl font-bold leading-7 text-white mb-10'>
                Staff Login
            </h1>
            <LoginForm 
                sendLogin={sendLogin}
                loginAsAdmin={adminLogin}
            />
        </div>
    )
}

export default LoginPage
