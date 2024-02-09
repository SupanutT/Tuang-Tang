import { Bill } from "../../interfaces";
export default async function putBill(data: Bill) {
    console.log({ data })

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/bills/${data._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    _id: data._id,
                    name: data.name,
                    date: data.date,
                    image: data.image,
                    owner_name: data.owner_name,
                    all_dividers: data.all_dividers,
                    billItems: data.billItems
                }
            }),
        })
        const res = await response.json();
        console.log(res)
        return res

    } catch (error) {
        console.error(error)
        throw new Error("Failed to put bill");
    }
}
