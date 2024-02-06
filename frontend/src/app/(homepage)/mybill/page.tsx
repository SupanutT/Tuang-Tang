import BillList from "../../components/BiilList";
import AddBill from "@/app/components/AddBill";


export default async function MyBill() {



    return (
        <main className="mt-[70px]">

            <BillList />
            <AddBill />
        </main>
    );
}
