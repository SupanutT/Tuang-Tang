'use client'
import { useAppSelector } from "@/redux/store";

export default function BillSumary() {

    const bill = useAppSelector((state) => state.BillSlice.bill)
    console.log(bill)
    if(bill){
        const owner_result = {
            name: bill.owner_name,

        }
    }else{
        console.error("Error! do not found bill");
    }

    return (
        <div>
            hello summary
        </div>
    );

}
