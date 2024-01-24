export default async function getBill( { params }: { params: {nid: string}}){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/bills/${params.nid}`)

    if(!response.ok){
        throw new Error("Failed to fetch bill")
    }

    return await response.json()
}
