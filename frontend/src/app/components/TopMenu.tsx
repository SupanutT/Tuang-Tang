
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import TopMenuSignOut from './TopMenuSignOut';

export default function TopMenu() {

    return (
        <div className='h-[50px] bg-orange-200 fixed top-0 right-0 left-0 z-30 border-y-2 border-black w-[100%] flex items-center'>
            <Link href={`/mybill`} className='h-[100%] w-auto pl-[10px]'>
                <Image src={'/img/logo.png'} alt='logo' width={0} height={0} sizes='100vh' className='h-[100%] w-auto'/>
            </Link>
            <TopMenuItem title='My Bill' pageRef='mybill'/>
            <TopMenuItem title='Other Bill' pageRef='otherbill'/>
            <TopMenuSignOut />

        </div>
    );
}
