'use client'
import { FormTextArea } from '@/components/FormTextArea'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

type ReplyProps = {
    repliesData: any[] | null,
    sendReply: (newReply: string) => Promise<{ data: never[]; error: PostgrestError } | { data: any[]; error?: undefined }>
}

const ReplyComponent = ({repliesData, sendReply}: ReplyProps) => {
    const [replies, setReplies] = useState(repliesData)
    const [newReply, setNewReply] = useState<string>('')
    const [newReplyData, setNewReplyData] = useState(null)

    useEffect(() => {
      if (newReplyData) {
        setReplies(currentReplies => [...currentReplies || [], newReplyData])
      }
    }, [newReplyData])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(newReply.trim().length < 5){
            return toast.error('Reply needs to be at least 5 characters')
        }
        
        const res = await sendReply(newReply)
        if(res.error){
            return toast.error('Failed to send ticket reply')
        }

        setNewReplyData(res.data[0])
        setNewReply('')

        return toast.success('Ticket reply has been sent')
    }

    return (
        <div className='border-t border-gray-100'>
            <Toaster />
            <div className='p-8'>
                <h3 className='text-base font-semibold leading-7 text-gray-900 pb-6'>Messages</h3>
                {replies !== null && replies.length > 0 ? (
                    <div className='border-y border-gray-100'>
                        {replies.map((reply,index) => (
                            <div key={reply.id} className={`flex text-sm flex-col py-4 ${index !== 0 && 'border-t border-gray-100'}`}>
                                <h4 className='font-medium text-gray-900'>{reply.staff.username}</h4>
                                <p className='text-sm my-4 text-gray-500 whitespace-pre-wrap'>{reply.text}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='border-y border-gray-100'>
                        <p className='text-sm my-4 text-gray-500 '>There are no replies yet.</p>
                    </div>
                )}
                <form className='py-6' onSubmit={onSubmit}>
                    <FormTextArea
                        name='comment'
                        labelText='Reply'
                        required
                        rows={3}
                        className='mb-6'
                        onChange={(e) => setNewReply(e.target.value)}
                    />
                    <div className='mt-6 w-full flex justify-end gap-3'>
                        <button type='submit' className='rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReplyComponent