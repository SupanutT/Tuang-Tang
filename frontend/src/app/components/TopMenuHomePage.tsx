'use client'

import SavingsIcon from '@mui/icons-material/Savings';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import TopMenuItem from './TopMenuItem';
import Image from 'next/image';
import TopMenuSignOut from './TopMenuSignOut';

export default function TopMenuHomePage() {

    const { data: session } = useSession();
    // console.log(session)

    return (
        <div className='h-[70px] bg-orange-200 fixed top-0 right-0 left-0 z-30 border-y-2 border-black w-[100%] flex items-center'>
            <Link href={`/`} className='h-[100%] w-1/12 flex justify-center items-center'>
                <SavingsIcon sx={{ fontSize: 40 }} />
            </Link>
            {session ? <TopMenuItem title='My Bill' pageRef='mybill' /> : null}
            {session ?
                <div className='rounded-full flex flex-row h-4/5 absolute right-5 overflow-hidden border border-black'>
                    <Image src={'/img/Jai.jpg'} alt='profile' height={0} width={0} layout='responsive' className='h-full' />
                </div>
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
