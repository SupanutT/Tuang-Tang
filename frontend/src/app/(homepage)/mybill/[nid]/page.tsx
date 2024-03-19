import Table from "@/app/components/Table";
import Link from "next/link";
import getBill from "@/libs/getBill";

export default async function MyBillDetailPage({ params }: { params: { nid: string } }) {

    // const data = await getBill({ params });
    // console.log(data)
    const data =
    {
        _id: "sadkfhalkjdahasdfasdfasdf",
        name: "here moo",
        date: "21/10/2545",
        image: {
            url: "www.image.com",
            filename: "image name"
        },
        owner_name: "Jai",
        all_dividers: ['Ping', 'North', 'Pee'],
        billItems: [
            { _id: "sdfsadfds1", menu: 'pizza', quantity: 2, price: 400, dividers: ['Ping', 'North'] },
            { _id: "sdfsadfds2", menu: 'french fries', quantity: 1, price: 138, dividers: ['Ping'] },
            { _id: "sdfsadfds3", menu: 'coke', quantity: 2, price: 80, dividers: ['Jai', 'Pee'] },
            { _id: "sdfsadfds4", menu: 'chicken', quantity: 2, price: 250, dividers: ['Pee', 'North'] },
        ]
    }

    return (
        <main className="min-h-screen mt-[70px] px-[10px] bg-gradient-to-tr from-sky-500 to-orange-300 bg-cover bg-fixed">
            <div className="text-3xl pt-[20px] pl-[50px]">
                {data.name}
            </div>
            <Table data={data} />

        </main>
    );
}
