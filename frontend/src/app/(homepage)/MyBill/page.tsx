import BillList from "../../components/BiilList";
import AddBill from "@/app/components/AddBill";

export default function MyBill(){
    return (
        <main className="mt-[50px]">
            <BillList who="my"/>
            <AddBill />
        </main>
    );
}
