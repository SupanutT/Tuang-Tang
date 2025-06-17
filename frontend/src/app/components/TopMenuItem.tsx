'use client'
import { useRouter } from 'next/navigation';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {

    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        router.push(`/${pageRef}`);
        router.refresh();
    };

    return (
        <div onClick={handleClick} className={`px-[20px] h-[100%] hover:bg-yellow-100 flex justify-center items-center`} >
            <div className={`font-serif text-sm text-black cursor-pointer`}>
                {title}
            </div>
        </div>
    );
}
