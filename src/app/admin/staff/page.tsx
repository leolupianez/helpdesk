import { createClient } from '@/lib/supabase.server'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Staff List - Help Desk',
}

const StaffPage = async () => {    
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('staff')
    .select('*')

    if (error) {
        console.error('Error fetching staff: ', error)
    }

    return (
        <>
            <div className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl'>
            { data && data.length > 0 ? (
                <div className='p-8'>
                    <div className='flex flex-row items-center mb-6 gap-3'>
                        <h1 className='flex-1 text-base font-semibold leading-6 text-gray-900'>Staff List</h1>
                        {user?.user_metadata.staff_role == 'admin' && (
                            <Link href={'/admin/add'} className={`rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}>
                                Add Staff
                            </Link>
                        )}
                    </div>

                    <table className='min-w-full mt-8 divide-y divide-gray-300'>
                        <thead>
                            <tr>
                                <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                                    Username
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {data.map(staff => (
                                <tr key={staff.id}>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                        {staff.username}
                                    </td>
                                    <td className='whitespace-nowrap px-3 py-4 text-xs text-white'>
                                        <span className={`rounded-md px-2 py-1 text-xs font-medium ${staff.staff_role == 'admin' ? 'bg-red-400' : staff.staff_role == 'support' ? 'bg-yellow-400' : 'bg-green-400'}`}>{staff.staff_role[0].toUpperCase() + staff.staff_role.slice(1)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='p-8 h-48'>
                    <p className='mt-2 text-sm text-gray-700'>There are no open tickets available.</p>
                </div>
            )}
            </div>
        </>
    )
}

export default StaffPage
