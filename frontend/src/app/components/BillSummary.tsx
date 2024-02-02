'use client'
import { useAppSelector } from "@/redux/store";
import { BillItem } from "../../../interfaces";

interface BillList {
    [key: string]: number
}

interface BillResult {
    name: string,
    billlist: {
        [key: string]: string
    },
    billresult: number
}

export default function BillSummary() {

    const calBill = (name: string, billItems: BillItem[]) => {
        let billResult = 0;
        const billList: BillList = {}
        billItems.map((menu: BillItem) => {
            if (menu.dividers.includes(name)) {
                const price = (menu.price / menu.dividers.length) * 100 % 100 != 0 ? Number((menu.price / menu.dividers.length).toFixed(2)) : Number((menu.price / menu.dividers.length).toFixed(0))
                console.log(price)
                billList[menu.menu] = price;
                billResult += price;
            }
        })
        return { name: name, billlist: billList, billresult: billResult * 100 % 100 != 0 ? Number(billResult).toFixed(2) : Number(billResult).toFixed(0) }
    }

    const bill = useAppSelector((state) => state.BillSlice.bill)
    // console.log(bill)
    const billSummary = []
    let bill_split_zero: any[] = []
    let bill_split_one: any[] = []
    let bill_split_two: any[] = []

    if (bill) {
        billSummary.push(calBill(bill.owner_name, bill.billItems))
        bill.all_dividers.map((divider) => {
            billSummary.push(calBill(divider, bill.billItems))
        })
        console.log(billSummary)

        bill_split_zero = billSummary.filter((divider, index) => index % 3 == 0)
        bill_split_one = billSummary.filter((divider, index) => index % 3 == 1)
        bill_split_two = billSummary.filter((divider, index) => index % 3 == 2)

    } else {
        console.error("Error! do not found bill");
    }

    return (
        <div className="w-[90%] mt-[20px] flex flex-row pb-[20px] justify-center rounded-lg">
            <div className="w-[30%] mx-[20px] flex flex-col">
                {bill_split_zero.map((divider, index) => {
                    return <div key={index} className="flex flex-col w-full mt-[20px] h-max rounded-lg border-red-700 border-2 overflow-hidden">
                        <div className="w-full bg-orange-200 py-[7px] flex p-[20px] text-lg">
                            {divider.name}
                        </div>

                        {Object.keys(divider.billlist).map((menu, index) => {
                            return <div key={index} className="w-full py-[5px] flex flex-row p-[15px] bg-gray-300 justify-between">
                                <div>
                                    {`${menu}`}
                                </div>
                                <div>
                                    {`-${divider.billlist[menu]} `}
                                </div>
                            </div>
                        })}

                        <div className="w-full py-[5px] flex p-[15px] bg-gray-300 justify-between">
                            <div>
                                total
                            </div>
                            <div>
                                {`-${divider.billresult} `}
                            </div>
                        </div>

                    </div>
                })}
            </div>
            <div className="w-[30%] mx-[20px] flex flex-col">
                {bill_split_one.map((divider, index) => {
                    return <div key={index} className="flex flex-col w-full mt-[20px] h-max rounded-lg border-red-700 border-2 overflow-hidden">
                        <div className="w-full bg-orange-200 py-[7px] flex p-[20px] text-lg">
                            {divider.name}
                        </div>

                        {Object.keys(divider.billlist).map((menu, index) => {
                            return <div key={index} className="w-full py-[5px] flex flex-row p-[15px] bg-gray-300 justify-between">
                                <div>
                                    {`${menu}`}
                                </div>
                                <div>
                                    {`-${divider.billlist[menu]} `}
                                </div>
                            </div>
                        })}

                        <div className="w-full py-[5px] flex p-[15px] bg-gray-300 justify-between">
                            <div>
                                total
                            </div>
                            <div>
                                {`-${divider.billresult} `}
                            </div>
                        </div>

                    </div>
                })}
            </div>
            <div className="w-[30%] mx-[20px] flex flex-col">
                {bill_split_two.map((divider, index) => {
                    return <div key={index} className="flex flex-col w-full mt-[20px] h-max rounded-lg border-red-700 border-2 overflow-hidden">
                        <div className="w-full bg-orange-200 py-[7px] flex p-[20px] text-lg">
                            {divider.name}
                        </div>

                        {Object.keys(divider.billlist).map((menu, index) => {
                            return <div key={index} className="w-full py-[5px] flex flex-row p-[15px] bg-gray-300 justify-between">
                                <div>
                                    {`${menu}`}
                                </div>
                                <div>
                                    {`-${divider.billlist[menu]} `}
                                </div>
                            </div>
                        })}

                        <div className="w-full py-[5px] flex p-[15px] bg-gray-300 justify-between">
                            <div>
                                total
                            </div>
                            <div>
                                {`-${divider.billresult} `}
                            </div>
                        </div>

                    </div>
                })}
            </div>
        </div>
    );

}
