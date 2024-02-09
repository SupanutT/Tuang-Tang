import { Bill } from "../../../interfaces";
import putBill from "@/libs/putBill";

export default function SaveBillButton({ data }: { data: Bill }) {

    const handleSave = async () => {
        const billData: Bill = {
            _id: data._id,
            name: data.name,
            date: data.date,
            image: data.image,
            owner_name: data.owner_name,
            all_dividers: data.all_dividers,
            billItems: data.billItems
        }
        const response = await putBill(billData);
    }
    return (
        <div className="fixed bottom-8 right-8">
            <button type="button" className="h-[50px] bg-zinc-800 px-[20px] text-white rounded-lg" onClick={() => handleSave()}>
                Save
            </button>
        </div>
    );
}
