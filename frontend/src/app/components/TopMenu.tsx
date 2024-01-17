
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';

export default function TopMenu() {
    return (
        <div className='h-[50px] bg-orange-200 fixed top-0 right-0 left-0 z-30 border-y-2 border-black w-[100%] flex items-center'>
            <Image src={'/img/logo.jpg'} alt='logo' width={0} height={0} sizes='100vh' className='h-[100%] w-auto'/>
            <TopMenuItem title='My Bill' pageRef='MyBill' side='left'/>
            <TopMenuItem title='Other Bill' pageRef='OtherBill' side='left'/>
            <TopMenuItem title='log out' pageRef='log-out' side='right'/>
        </div>
    );
}
