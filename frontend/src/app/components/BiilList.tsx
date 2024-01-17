
import { useReducer } from "react";
import BillCard from "./BillCard";

export default function BillList() {

    const mockBillData = [
        {
            bid: "001",
            name: "Izakaya",
        },
        {
            bid: "002",
            name: "Jae Oh",
        },
        {
            bid: "003",
            name: "Hea Moo",
        },
        {
            bid: "004",
            name: "Izakaya AV",
        },
        {
            bid: "005",
            name: "IIzakaya AV2",
        },

    ]


    return (
        <div className="flex flex-row justify-evenly content-evenly flex-wrap gap-x-5">
            {mockBillData.map((bill)=>(
                <BillCard bid={bill.bid} billName={bill.name} />
            ))}
        </div>
    );
}
