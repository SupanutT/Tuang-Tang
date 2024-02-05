import Table from "@/app/components/Table";
import Link from "next/link";
import getBill from "@/libs/getBill";

export default async function MyBillDetailPage({ params }: { params: { nid: string } }) {

    const data = await getBill({ params });
    // console.log(data)

    return (
        <main className="min-h-screen mt-[50px] px-[10px] bg-gradient-to-tr from-sky-500 to-orange-300 bg-cover bg-fixed">
            <div className="text-3xl pt-[20px] pl-[50px]">
                {data.name}
            </div>
            <Table data={data} />

        </main>
    );
}
