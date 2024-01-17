import InteractiveCard from "./InteractiveCard";
import Image from "next/image";


export default function BillCard ( { billName }: { billName: string } ) {
    return (
        <InteractiveCard contentName={ billName }>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src='/img/ffdd0e.png' alt="Bill Picture" fill={true} className="object-fill rounded-lg" />
            </div>
            <div className="w-full h-[30%] p-[10px] pl-[15px] text-black">{billName}</div>
        </InteractiveCard>

    );
}
