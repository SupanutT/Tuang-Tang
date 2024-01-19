import BillList from "../../components/BiilList";
import AddBill from "@/app/components/AddBill";

export default function MyBill() {
    return (
        <main className="mt-[50px]">
            <h1>CI/CD FROM GITHUB ACTIONS</h1>
            <BillList who="my" />
            <AddBill />
        </main>
    );
}
