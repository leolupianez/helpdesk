import { createClient } from '@/lib/supabase.server'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Staff Dashboard - Help Desk',
}

const AdminPage = async () => {    
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('ticket')
    .select('*')
    .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching tickets: ', error)
    }

    return (
        <>
            <h1 className='text-3xl font-bold leading-7 text-white mb-10'>
                {`Welcome back, ${user?.user_metadata.username}`}
            </h1>
            <div className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl'>
            { data && data.length > 0 ? (
                <div className='p-8'>
                    <h1 className='text-base font-semibold leading-6 text-gray-900'>Tickets</h1>
                    <table className='min-w-full mt-8 divide-y divide-gray-300'>
                        <thead>
                            <tr>
                                <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                                    Name
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Date
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Status
                                </th>
                                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {data.map(ticket => (
                                <tr key={ticket.id}>
                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 max-w-0'>
                                        <Link href={`/admin/ticket/${ticket.id}`} className='underline'>
                                            {ticket.name}
                                        </Link>
                                    </td>
                                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {new Date(ticket.created_at).toLocaleDateString()}
                                    </td>
                                    <td className='whitespace-nowrap px-3 py-4 text-xs text-white'>
                                        <span className={`rounded-md px-2 py-1 text-xs font-medium ${ticket.status == 'new' ? 'bg-red-400' : ticket.status == 'in progress' ? 'bg-yellow-400' : 'bg-green-400'}`}>{ticket.status[0].toUpperCase() + ticket.status.slice(1)}</span>
                                    </td>
                                    <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                                        <Link href={`/admin/ticket/${ticket.id}`} className='text-blue-600 hover:text-blue-900'>
                                            View
                                        </Link>
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

export default AdminPage
