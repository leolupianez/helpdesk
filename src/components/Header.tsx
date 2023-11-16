import { createClient } from '@/lib/supabase.server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from "next/image"
import logo from '../../public/logo.svg'

const Header = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'
    
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
        return redirect('/login')
    }

    return (
        <header>
            <nav className='p-6 lg:px-8'>
                <div className='flex items-center justify-between border-b pb-6 border-white/10'>
                    <div className='flex lg:flex-1'>
                        <Link href='/' className='-m-1.5 p-1.5 text-white font-bold'>
                            <Image src={logo} width="120" height="64" alt="Help Desk" />
                        </Link>
                    </div>
                    {user ? (
                    <>
                        <div className='flex gap-x-12'>
                            <Link href='/admin' className='text-sm font-semibold leading-6 text-white'>
                                View Tickets
                            </Link>
                            <Link href='/admin/staff' className='text-sm font-semibold leading-6 text-white'>
                                View Staff
                            </Link>
                            {/* {user.user_metadata.staff_role == 'admin' && (
                                <Link href={`/admin/add`} className='text-sm font-semibold leading-6 text-white'>
                                    Add Staff
                                </Link>
                            )} */}

                        </div>
                        <div className='flex flex-1 items-center justify-end gap-x-6'>
                            <form action={signOut}>
                                <button  className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </>
                    ) : (
                        <div className='flex flex-1 items-center justify-end gap-x-6'>
                            <Link href='/admin' className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                                Staff Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header