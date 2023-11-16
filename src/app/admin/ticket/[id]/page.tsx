import { createClient } from '@/lib/supabase.server'
import { cookies } from 'next/headers'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'
import ReplyComponent from '@/components/ReplyComponent'
import TicketInfoComponent from '@/components/TicketInfoComponent'

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
   
    return {
      title: `Ticket #${params.id} - Help Desk`,
    }
}

const TicketPage = async (props: Props) => {   
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // If not logged in
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) redirect('/admin')

    // Get ticket data
    const { data: ticketData, error: ticketError } = await supabase
    .from('ticket')
    .select('*')
    .eq('id', props.params.id)
    .single()

    if (ticketError) {
        return redirect('/admin?error=Could not fetch ticket data')
    }

    // Get ticket replies
    const { data: repliesData, error: repliesError } = await supabase
    .from('reply')
    .select('*, staff(*)')
    .eq('ticketid', ticketData.id)

    if (repliesError) {
        return redirect('/admin?error=Could not fetch replies')
    }

    // Save replies in Database
    const sendReply = async (newReply: string) => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { data, error } = await supabase
        .from('reply')
        .insert({
            id: randomUUID(),
            text: newReply,
            userid: user.id,
            ticketid: ticketData.id
        })
        .select('*, staff(*)')

        if (error) return { data: [], error }

        return { data }
    }

    const updateTicketStatus = async (newStatus: string) => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data, error } = await supabase
            .from('ticket')
            .update({ status: newStatus })
            .eq('id', ticketData.id)
            .select()
    
        if (error) return { data: [], error }

        return { data }
    }

    return (
        <>
            <h1 className='text-3xl font-bold leading-7 text-white mb-10'>
                {`Ticket # ${ticketData.id}`}
            </h1>
            <div className='bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl'>
                <TicketInfoComponent 
                    ticketData={ticketData}
                    updateTicketStatus={updateTicketStatus}
                />
                <ReplyComponent
                    repliesData={repliesData}
                    sendReply={sendReply} 
                />
            </div>
        </>
    )
}

export default TicketPage
