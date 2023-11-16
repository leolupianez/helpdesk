'use client'
import { PostgrestError } from '@supabase/supabase-js'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

type TicketProps = {
    ticketData: any
    updateTicketStatus: (newStatus: string) => Promise<{ data: any[]; error?: PostgrestError }>
}

const TicketInfoComponent = ({ticketData, updateTicketStatus}: TicketProps) => {
    const [currentStatus, setCurrentStatus] = useState<string>(ticketData.status)

    const statusList = [
        {
            status: 'new', 
            color: 'bg-red-500 hover:bg-red-400 focus-visible:outline-red-500'
        },
        {
            status: 'in progress', 
            color: 'bg-yellow-500 hover:bg-yellow-400 focus-visible:outline-yellow-500'
        }, 
        {
            status: 'done', 
            color: 'bg-green-500 hover:bg-green-400 focus-visible:outline-green-500'
        }, 
    ]

    const onSubmit = async (newStatus: string) => {
        const res = await updateTicketStatus(newStatus)
        if(res.error){
            toast.error('Failed to update ticket status')
        }
        setCurrentStatus(res.data[0].status)
        return toast.success('Ticket status updated')
    }

    return (
        <div className='p-8'>
            <div className='flex flex-row items-center mb-6 gap-3'>
                <h3 className='text-base font-semibold leading-7 text-gray-900 flex-1'>Ticket Information</h3>
                <Toaster />
                {statusList.map(status => (
                    <form className={currentStatus === status.status ? 'hidden': ''} key={status.status} onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(status.status)}}>
                        <button type='submit' className={`rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${status.color}`}>
                            Mark as {status.status[0].toUpperCase() + status.status.slice(1)}
                        </button>
                    </form>
                ))}
            </div>
            <div className='border-t border-gray-100'>
                <dl className='divide-y divide-gray-100'>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>Name</dt>
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{ticketData.name}</dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>Date</dt>
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{new Date(ticketData.created_at).toLocaleDateString()}</dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>Email address</dt>
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{ticketData.email}</dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>Status</dt>
                        <dd><span className={`text-white rounded-md px-2 py-1 text-xs font-medium ${currentStatus == 'new' ? 'bg-red-400' : currentStatus == 'in progress' ? 'bg-yellow-400' : 'bg-green-400'}`}>
                            {currentStatus[0].toUpperCase() + currentStatus.slice(1)}</span>
                        </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6 text-gray-900'>Description</dt>
                        <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{ticketData.description}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default TicketInfoComponent