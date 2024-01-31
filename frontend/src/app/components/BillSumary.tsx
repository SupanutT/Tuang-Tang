'use client'
import { useAppSelector } from "@/redux/store";
import { BillItem } from "../../../interfaces";

interface BillList {
    [key: string]: number
}

export default function BillSumary() {

    const calBill = (name: string, billItems: BillItem[]) => {
        let billResult = 0;
        const billList: BillList = {}
        billItems.map((menu) => {
            if (name in menu.dividers) {
                billList[menu.menu] = menu.price / menu.dividers.length
                billResult += menu.price / menu.dividers.length
            }
        })
        return { name: name, billlist: billList, billresult: billResult }
    }

    const bill = useAppSelector((state) => state.BillSlice.bill)
    console.log(bill)
    if (bill) {
        const billSumary = []
        billSumary.push(calBill(bill.owner_name, bill.billItems))
        return
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
