import Table from "@/app/components/Table";
import Link from "next/link";
import getBill from "@/libs/getBill";

export default async function MyBillDetailPage({ params }: { params: { nid: string } }) {

    const data = await getBill({ params });
    // console.log(data)

    return (
        <main className="mt-[50px] px-[10px] bg-gradient-to-tr from-sky-500 to-orange-300 ">
            <div className="text-md">
                MyBill ID {params.nid}
            </div>
            <Table data={data} />

        </main>
    );
}
