'use client'
import Image from 'next/image';
import { useState } from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import Link from 'next/link';
import TopMenuItem from './components/TopMenuItem';


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='h-[50px] bg-orange-200 fixed top-0 right-0 left-0 z-30 border-y-2 border-black w-[100%] flex items-center'>
            <Link href={`/mybill`} className='h-[100%] w-1/12 flex justify-center items-center'>
                <SavingsIcon sx={{ fontSize: 40 }} />
            </Link>
            <div className='flex flex-row h-full absolute right-0'>
              <Link href={`/login`}>
                <div className="px-[10px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer ">
                  Sign In
                </div>
              </Link>
              <Link href={`/register`}>
                <div className="px-[10px] h-[100%] hover:bg-yellow-100 flex justify-center items-center font-serif text-sm text-black cursor-pointer" >
                  Sign Up
                </div>
              </Link>
            </div>
        </div>

        <h1>Hello Welcome</h1>
    </main>
  );
}
