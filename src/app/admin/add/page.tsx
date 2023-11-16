import React, { useRef } from 'react'
import { createClient } from '@/lib/supabase.server'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Register from '@/components/Register'

export const metadata: Metadata = {
    title: 'Add Staff - Help Desk',
}

const AddStaff = () => {    
    const createStaff = async (email: string, password: string, username: string) => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data: { session } } = await supabase.auth.getSession()
        if(!session?.user) return { error: 'You need to be logged in' }

        const { data: userData, error: userError } = await supabase
            .from('staff')
            .select('*')
            .eq('id', session?.user.id)
            .single()
            
        if(userError) return { error: userError.message }

        if(userData.staff_role != "admin"){
            return {error: 'You need to be an admin to add new staff'}
        }
        const {data, error} = await supabase.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
                data: {
                    username: username.trim(),
                    staff_role: 'support'
                }
            }
        })
        if (error) return { error: error.message }

        return { success: 'Staff member has been added succesfully.' }
    }

    return (
        <div className='mx-auto max-w-2xl'>
            <h1 className='text-3xl font-bold leading-7 text-white mb-10'>
                Add Staff
            </h1>
            <Register 
                className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl' 
                createStaff={createStaff}
            />
        </div>
    )
}

export default AddStaff
