import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem( { title, pageRef, side }: { title: string, pageRef: string, side: string }){

    const sideClass = side=="left" ? "float-left": "float-right"

    const className = `w-[80px] mt-auto mb-auto text-center font-sans text-sm text-black ${sideClass}`

    return (
        <Link href={`/${pageRef}`} className={className}>
            {title}
        </Link>
    );
}
