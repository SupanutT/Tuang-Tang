import {getCookie } from 'cookies-next'
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const access_token = getCookie('access_token', {cookies})
    return new Response(JSON.stringify({token : access_token}))
}
