import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="p-6 lg:px-8">
      <div className='border-t pt-6 border-white/10 text-center '>
        <p className='text-sm leading-6 text-white'>Powered by <Link href="https://nextjs.org/" target="_blank" className="font-bold">Next.js</Link> and <Link href="https://supabase.com" target="_blank" className="font-bold">Supabase</Link>. Deployed on <Link href="https://railway.app/" target="_blank" className="font-bold">Railway</Link>.</p>
      </div>
    </footer>
  )
}