
import BillCard from "./BillCard";
import Link from "next/link";
import getBills from "@/libs/getBills";

interface Bill {
    [key: string]: any
}

export default async function BillList() {


    const billResponse = await getBills();
    console.log(billResponse)
    const billData: Bill[] = billResponse;

    // console.log(billData)



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
