
import BillCard from "./BillCard";
import Link from "next/link";
import getBills from "@/libs/getBills";

export default async function BillList( { who }: { who: string } ) {

    const billData = await getBills();

    // console.log(billData.bills)

    const mockMyBillData = [
        { bid: "001", name: "Izakaya" },
        { bid: "002", name: "Jae Oh", },
        { bid: "003", name: "Hea Moo",},
        { bid: "004", name: "Izakaya AV", },
        { bid: "005", name: "IIzakaya AV2", },
    ];

    const mockOtherBillData = [
        { bid: "001", name: "Izakaya" },
        { bid: "002", name: "Jae Oh", },
        { bid: "003", name: "Hea Moo",},
        { bid: "004", name: "Izakaya AV", },
    ];


    const Data = who=="my" ? mockMyBillData: mockOtherBillData;


    return (
        <div className="flex flex-row justify-evenly content-evenly flex-wrap gap-x-5">
            {Data.map((billItem)=>(
                <Link href={`/${who}bill/${billItem.bid}`} className="w-1/6 mt-[40px]">
                    <BillCard bid={billItem.bid} billName={billItem.name} />
                </Link>
            ))}
        </div>
    );
}
