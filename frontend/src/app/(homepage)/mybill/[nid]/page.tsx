import Table from "@/app/components/Table";
import Link from "next/link";

export default function MyBillDetailPage( {params}: { params: {nid:string}}){
    return (
        <main className="mt-[50px] px-[10px] bg-gradient-to-tr from-sky-500 to-orange-300 h-[100vh]">
            <div className="text-md">
                MyBill ID {params.nid}
            </div>
            <Table/>

        </main>
    );
}
