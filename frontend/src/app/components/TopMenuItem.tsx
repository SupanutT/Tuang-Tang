
import Link from 'next/link';

export default function TopMenuItem( { title, pageRef, side }: { title: string, pageRef: string, side: string }){

    const sideClass = side=="left" ? "": "absolute right-0";

    return (
        <div className={`w-[80px] h-[100%] mt-auto mb-auto font-sans text-sm text-black ${sideClass} hover:bg-yellow-100 flex justify-center items-center cursor-pointer` }>
            <Link href={`/${pageRef}` } >
                {title}
            </Link>
        </div>
    );
}
