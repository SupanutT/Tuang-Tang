'use client'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function TopMenuSignOut() {

    const router = useRouter();

    const { data: session } = useSession()

    // console.log(session);

    const handleSignOut = () => {
        signOut({
            redirect: false,
        }).then(() => {
            router.push('/');
        }).catch(error => {
            console.error('Error signing out: ', error)
        })
    };

    return (

        <div className="px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer absolute right-0"
            onClick={() => { handleSignOut() }} >
            {`Sign-out of ${session?.user?.name}`}
        </div>
    );

}
