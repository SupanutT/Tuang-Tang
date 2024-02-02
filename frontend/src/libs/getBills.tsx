import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function getBills() {

    const session = await getServerSession(authOptions)
    // console.log(session)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/bills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },

        })

        const response = await res.json();
        // console.log(response.data)
        const data = response.data

        return data

    } catch (error) {
        throw new Error("Failed to get bills");
    }
}

