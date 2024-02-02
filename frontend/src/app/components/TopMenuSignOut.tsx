'use client'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function TopMenuSignOut() {

    const { data: session } = useSession();

    const router = useRouter();

    // console.log(session);

    const handleSignOut = () => {
        signOut({
            callbackUrl: '/',
        });
        router.push('/'); // Redirect after sign out
    };

    return (
        <div className="px-[10px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer absolute right-0"
            onClick={() => { handleSignOut() }} >
            {`Sign-out of me`}
        </div>
    );

}
