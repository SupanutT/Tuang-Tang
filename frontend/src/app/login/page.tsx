'use client';

import { useState, useEffect } from 'react';

import SavingsIcon from '@mui/icons-material/Savings';
import Link from 'next/link';
import getToken from '@/libs/getToken';


import { useRouter } from 'next/navigation';

export default function Home() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const access_token = await getToken();
      if (access_token) {
        router.push('/mybill')
      }
    };

    fetchAccessToken();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push('/mybill')

        // Handle successful login, e.g., redirect to another page
      } else {
        console.error('Login failed');
        // Handle failed login, e.g., show an error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network errors or other issues
    }
  };

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
