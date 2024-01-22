
import BillCard from "./BillCard";
import Link from "next/link";
import getBills from "@/libs/getBills";

interface Bill {
    [key: string]: any
}

export default async function BillList() {


    const billResponse = await getBills();
    const billData: Bill[] = billResponse.bills;

    // console.log(billData)
    /*

    // mockdata

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
    */


    // const Data = who=="my" ? mockMyBillData: mockOtherBillData;


    return (
        <div className="flex flex-row justify-evenly content-evenly flex-wrap gap-x-5">
            {billData.map((billItem)=>{
                return (
                    <Link href={`/mybill/${billItem._id}`} className="w-1/6 mt-[40px]">
                        <BillCard bid={billItem._id} billName={billItem.name} createdDate={billItem.date} imgSrc={billItem.image}/>
                    </Link>
                );
            }
            )}
        </div>
    );
}

//{ who }: { who: string }
