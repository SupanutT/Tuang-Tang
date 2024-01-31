'use client'
import { useAppSelector } from "@/redux/store";
import { BillItem } from "../../../interfaces";

interface BillList {
    [key: string]: number
}

export default function BillSummary() {

    const calBill = (name: string, billItems: BillItem[]) => {
        let billResult = 0;
        const billList: BillList = {}
        billItems.map((menu: BillItem) => {
            if (menu.dividers.includes(name)) {
                const price = Math.round(menu.price / menu.dividers.length * 100) / 100
                billList[menu.menu] = price;
                billResult += price;
            }
        })
        return { name: name, billlist: billList, billresult: billResult }
    }

    const bill = useAppSelector((state) => state.BillSlice.bill)
    console.log(bill)
    if (bill) {
        const billSummary = []
        billSummary.push(calBill(bill.owner_name, bill.billItems))
        bill.all_dividers.map((divider) => {
            billSummary.push(calBill(divider, bill.billItems))
        })
        console.log(billSummary)
    } else {
        console.error("Error! do not found bill");
    }

    return (
        <div>
            hello summary
        </div>
    );

}
