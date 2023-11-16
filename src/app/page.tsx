import { Metadata } from 'next'
import TicketForm from "@/components/TicketForm"

export const metadata: Metadata = {
    title: 'Help Desk',
}

const Home = () => {   
    return (
        <main className='mx-auto max-w-2xl'>
            <h2 className='text-3xl font-bold leading-7 text-white mb-10'>
                Support Ticket
            </h2>
            <TicketForm />
        </main>
    )
}

export default Home