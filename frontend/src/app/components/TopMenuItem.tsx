
import Link from 'next/link'

export default function TopMenuItem( { title, pageRef, side }: { title: string, pageRef: string, side: string }){

    const sideClass = side=="left" ? "": "absolute right-1"

    return (
        <Link href={`/${pageRef}`} className={`w-[80px] mt-auto mb-auto text-center font-sans text-sm text-black ${sideClass}`}>
            {title}
        </Link>
    );
}
