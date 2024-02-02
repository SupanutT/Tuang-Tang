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
    // console.log(bill)
    const billSummary = []
    if (bill) {
        billSummary.push(calBill(bill.owner_name, bill.billItems))
        bill.all_dividers.map((divider) => {
            billSummary.push(calBill(divider, bill.billItems))
        })
        console.log(billSummary)
    } else {
        console.error("Error! do not found bill");
    }

    return (
        <div className="w-[80%] bg-gray-200 mt-[10px] flex flex-col py-[20px] pt-[2%] justify-center">
            {billSummary.map((divider, index) => {
                if (index % 2 == 0) {
                    return <div key={index} className="flex flex-col w-[40%] m-[20px] bg-yellow-300 py-[2%] h-max">
                        <div>
                            {divider.name}
                        </div>

                        {Object.keys(divider.billlist).map((menu, index) => {
                            return <div key={index} >
                                {`${menu} : ${divider.billlist[menu]} baht`}
                            </div>
                        })}

                    </div>
                }
            })}
        </div>
    );

}
