'use client'
import { useAppSelector } from "@/redux/store";
import { BillItem } from "../../../interfaces";

export default function BillSumary() {

    const calBill = (name: string, billItems: BillItem) => {
        let billResult = 0;
        // const billList =
    }

    const bill = useAppSelector((state) => state.BillSlice.bill)
    console.log(bill)
    if (bill) {
        const owner_result = {
            name: bill.owner_name,
            billlist: bill.billItems.map((menu) => {
                if (bill.owner_name in menu.dividers) {
                    return { [menu.menu]: menu.price / menu.dividers.length }
                } else {
                    return null
                }
            })

        }
    } else {
        console.error("Error! do not found bill");
    }

    return (
        <div>
            hello summary
        </div>
    );

}
