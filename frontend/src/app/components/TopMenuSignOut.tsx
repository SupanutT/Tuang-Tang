'use client'
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TopMenuSignOut() {

    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = () => {
       signOut({
        callbackUrl: '/',
      });
      router.push('/'); // Redirect after sign out
    };

    return (
        session?
        <div className="px-[10px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer absolute right-0"
        onClick={() => {handleSignOut()}}
        >
            {`Sign-out of ${session.user?.name}`}
        </div>
        :null
    );
}
