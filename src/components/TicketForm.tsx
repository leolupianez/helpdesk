'use client'
import { useState } from 'react'
import { FormInput } from './FormInput'
import { FormTextArea } from './FormTextArea'
import { createClient } from '@/lib/supabase.client'
import { Toaster, toast } from 'sonner'
const TicketForm = () => {
    const [ticketData, setTicketData] = useState<{ id: number, name: string, email: string, created_at: string, description: string, status: string } | null>(null)

    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, isSuccess] = useState<boolean>(false)

    const supabase = createClient()

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const { data, error } = await supabase
        .from('ticket')
        .insert({
            name: name,
            email: email,
            description: description
        })
        .select()

        if (error) {
            setIsLoading(false)
            return toast.error('Failed to send ticket.')
        }

        setName('')
        setEmail('')
        setDescription('')
        setIsLoading(false)
        setTicketData(data[0])

        toast.success('Ticket was sent successfully.')
    }

    return (
        <>
            <Toaster />
            {ticketData ? (
                <div className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl h-58'>
                    <div className='p-8'>
                        <p className='text-sm leading-6 text-gray-900'><span className='font-bold'>To</span>: {ticketData.email}</p>
                        <p className='text-sm leading-6 text-gray-900 mb-5'><span className='font-bold'>Subject</span>: We&apos;ve Received Your Support Ticket #{ticketData.id}</p>
                        <p className='text-sm leading-6 text-gray-900'>Dear {ticketData.name},</p>
                        <p className='text-sm leading-6 text-gray-900'>Thank you for reaching out to us.</p>
                        <p className='text-sm leading-6 text-gray-900 mb-5'>We&apos;re writing to let you know that we&apos;ve received your support ticket, and it is now being processed. Your ticket number is #{ticketData.id}. Please refer to this number in any future correspondence regarding this issue.</p>
                        <p className='text-sm leading-6 text-gray-900'>If you have any additional information to add or questions in the meantime, please don&apost hesitate to reach out by replying to this email</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={onSubmit} className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl'>
                    <div className='p-8'>
                        <div className='border-b border-gray-900/10 pb-6'>
                            <FormInput
                                name='name'
                                labelText='Name'
                                placeholder='John Smith'
                                className='mb-5'
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <FormInput
                                name='email'
                                type='email'
                                labelText='Email'
                                placeholder='jsmith@email.com'
                                className='mb-5'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <FormTextArea
                                name='description'
                                labelText='Description'
                                rows={3}
                                required
                                className='col-span-full'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='mt-6'>
                            <button type='submit' disabled={isLoading} className='w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                                {isLoading ? 'Sending..' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            )}

        </>
    )
}

export default TicketForm