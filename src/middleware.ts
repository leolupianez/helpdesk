import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase.middleware'

export async function middleware(request: NextRequest) {
    const { supabase, response } = createClient(request)
    const { data: { session } } = await supabase.auth.getSession()

    // Check auth for admin panel
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if(session?.user){
            return response
        }else{
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (request.nextUrl.pathname === '/' && session?.user){
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*', '/'],
}