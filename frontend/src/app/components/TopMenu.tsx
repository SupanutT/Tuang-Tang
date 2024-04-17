
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import TopMenuSignOut from './TopMenuSignOut';

export default async function TopMenu() {


    return (
        <div className='h-[70px] pl-[20px] bg-orange-200 fixed top-0 right-0 left-0 z-30 border-y-2 border-black w-[100%] flex items-center'>
            <Link href={`/`} className='h-[70%] w-[5%] flex items-center justify-center'>
                <img src={'/img/icon.png'} alt='logo' className='h-[100%] w-auto' />
            </Link>
            <TopMenuItem title='My Bill' pageRef='mybill' />
            <TopMenuItem title='Other Bill' pageRef='otherbill' />
            <TopMenuSignOut />

        </div>
    );
}
