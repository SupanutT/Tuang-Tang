'use client'

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import TopMenuItem from './TopMenuItem';
import TopMenuSignOut from './TopMenuSignOut';

export default function TopMenuHomePage() {

    const { data: session } = useSession();

    return (
        <div className='h-[70px] bg-orange-200 fixed top-0 right-0 left-0 z-30 border-y-2 border-black w-[100%] flex items-center'>
            <Link href={`/`} className='h-[70%] w-[5%] flex items-center justify-center'>
                <img src={'/img/icon.png'} alt='logo' className='h-[100%] w-auto' />
            </Link>
            {session && <TopMenuItem title='My Bill' pageRef='mybill' />}
            {session ?
                <TopMenuSignOut />
                :
                <div className='flex flex-row h-full absolute right-0'>
                    <Link href={`/login`}>
                        <div className="px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer ">
                            Sign In
                        </div>
                    </Link>
                    <Link href={`/register`}>
                        <div className="px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer" >
                            Sign Up
                        </div>
                    </Link>
                </div>

            }

        </div>
    );
}
