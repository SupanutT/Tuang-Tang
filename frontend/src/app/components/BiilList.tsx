
import { useReducer } from "react";
import BillCard from "./BillCard";
import Link from "next/link";

export default function BillList( { who }: { who: string } ) {

    const mockMyBillData = [
        { bid: "001", name: "Izakaya" },
        { bid: "002", name: "Jae Oh", },
        { bid: "003", name: "Hea Moo",},
        { bid: "004", name: "Izakaya AV", },
        { bid: "005", name: "IIzakaya AV2", },
    ]

    const mockOtherBillData = [
        { bid: "001", name: "Izakaya" },
        { bid: "002", name: "Jae Oh", },
        { bid: "003", name: "Hea Moo",},
        { bid: "004", name: "Izakaya AV", },
    ]

    const Data = who=="My" ? mockMyBillData: mockOtherBillData


    return (
        <div className="flex flex-row justify-evenly content-evenly flex-wrap gap-x-5">
            {Data.map((billItem)=>(
                <Link href={`/${who}Bill/${billItem.bid}`} className="w-1/6">
                    <BillCard bid={billItem.bid} billName={billItem.name} />
                </Link>
            ))}
        </div>
    );
}
