'use client'
import { useAppSelector } from "@/redux/store";

export default function BillSumary() {

    const bill = useAppSelector((state) => state.BillSlice.bill)
    console.log(bill)

    return (
        <div>
            hello summary
        </div>
    );

}
