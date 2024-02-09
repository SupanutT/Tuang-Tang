
import Link from 'next/link';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {

    return (
        <Link href={`/${pageRef}`} className={`px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center`} >
            <div className={`font-serif text-sm text-black cursor-pointer`}>
                {title}
            </div>
        </Link>
    );
}
