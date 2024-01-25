'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SumaryPage(){
    const router = useRouter();
    console.log(router);
    return (
        <div>
            hello
        </div>
    );

}
